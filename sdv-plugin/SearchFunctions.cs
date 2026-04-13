using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.JavaScript;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using SeedFinding.NightEvents;

namespace SeedFinding;

public partial class SearchFunctions
{
    private const int MaxAllowedFairySeedResults = 10000;
    private static readonly ConcurrentDictionary<string, FairySearchJob> FairySearchJobs = new();

    private sealed class FairySearchJob
    {
        internal FairySearchJob(int workerCount, int targetCount, CancellationTokenSource cancellationTokenSource)
        {
            WorkerCount = workerCount;
            TargetCount = targetCount;
            CancellationTokenSource = cancellationTokenSource;
        }

        internal int WorkerCount { get; }
        internal int TargetCount { get; }
        internal CancellationTokenSource CancellationTokenSource { get; }
        internal ConcurrentBag<int> MatchingSeeds { get; } = new();
        internal ConcurrentDictionary<int, byte> ThreadIds { get; } = new();
        internal Task SearchTask { get; set; } = Task.CompletedTask;
        internal int FoundCount;
        internal int ProcessedChunks;
        internal bool CancelRequestedByUser;
        internal string Status { get; set; } = "running";
        internal string ErrorMessage = string.Empty;
        internal int[] FinalSeeds = Array.Empty<int>();
    }

    [JSExport]
    [RequiresUnreferencedCode("Calls Newtonsoft.Json.JsonConvert.SerializeObject(Object)")]
    internal static Task<string> GetThreadSettings()
    {
        int availableWorkers = Math.Max(1, Environment.ProcessorCount);
        var response = new
        {
            maxRequestableWorkers = availableWorkers,
            defaultWorkers = availableWorkers,
        };

        return Task.FromResult(JsonConvert.SerializeObject(response));
    }

    [JSExport]
    [RequiresUnreferencedCode("Calls Newtonsoft.Json.JsonConvert.SerializeObject(Object)")]
    internal static Task<string> StartFairySeedSearch(bool useLegacyRandom, int day, int maxResults, int requestedWorkers)
    {
        int availableWorkers = Math.Max(1, Environment.ProcessorCount);
        int workerCount = requestedWorkers <= 0
            ? availableWorkers
            : Math.Clamp(requestedWorkers, 1, availableWorkers);
        int targetCount = Math.Clamp(maxResults, 1, MaxAllowedFairySeedResults);
        string searchId = Guid.NewGuid().ToString("N");

        CancellationTokenSource cts = new();
        FairySearchJob job = new(workerCount, targetCount, cts);

        if (day <= 1)
        {
            job.FinalSeeds = Array.Empty<int>();
            job.Status = "completed";
            FairySearchJobs[searchId] = job;
            var earlyStartResponse = new
            {
                status = "started",
                searchId,
                workersRequested = workerCount,
            };
            return Task.FromResult(JsonConvert.SerializeObject(earlyStartResponse));
        }

        FairySearchJobs[searchId] = job;
        job.SearchTask = Task.Run(() => RunFairySeedSearchAsync(job, useLegacyRandom, day));

        var startResponse = new
        {
            status = "started",
            searchId,
            workersRequested = workerCount,
        };
        return Task.FromResult(JsonConvert.SerializeObject(startResponse));
    }

    [JSExport]
    [RequiresUnreferencedCode("Calls Newtonsoft.Json.JsonConvert.SerializeObject(Object)")]
    internal static Task<string> GetFairySeedSearchStatus(string searchId)
    {
        if (!FairySearchJobs.TryGetValue(searchId, out FairySearchJob job))
        {
            return Task.FromResult(JsonConvert.SerializeObject(new { status = "not_found" }));
        }

        if (job.Status == "running")
        {
            var runningResponse = new
            {
                status = "running",
                progress = new
                {
                    seedsFound = Volatile.Read(ref job.FoundCount),
                    processedChunks = Volatile.Read(ref job.ProcessedChunks),
                    workersRequested = job.WorkerCount,
                    threadsUsed = job.ThreadIds.Count,
                },
            };
            return Task.FromResult(JsonConvert.SerializeObject(runningResponse));
        }

        if (job.Status == "failed")
        {
            var failedResponse = new
            {
                status = "failed",
                error = job.ErrorMessage ?? "Search failed.",
            };
            return Task.FromResult(JsonConvert.SerializeObject(failedResponse));
        }

        int[] seeds = job.FinalSeeds.Length > 0 || job.Status != "completed"
            ? job.FinalSeeds
            : BuildSortedSeeds(job.MatchingSeeds, job.TargetCount);
        var completedResponse = new
        {
            status = job.Status,
            seeds,
            debug = new
            {
                workersRequested = job.WorkerCount,
                threadsUsed = job.ThreadIds.Count,
            },
        };
        return Task.FromResult(JsonConvert.SerializeObject(completedResponse));
    }

    [JSExport]
    [RequiresUnreferencedCode("Calls Newtonsoft.Json.JsonConvert.SerializeObject(Object)")]
    internal static Task<string> CancelFairySeedSearch(string searchId)
    {
        if (!FairySearchJobs.TryGetValue(searchId, out FairySearchJob job))
        {
            return Task.FromResult(JsonConvert.SerializeObject(new { status = "not_found" }));
        }

        if (job.Status != "running")
        {
            return Task.FromResult(JsonConvert.SerializeObject(new { status = job.Status }));
        }

        job.CancelRequestedByUser = true;
        try
        {
            job.CancellationTokenSource.Cancel();
        }
        catch (ObjectDisposedException)
        {
            return Task.FromResult(JsonConvert.SerializeObject(new { status = job.Status }));
        }

        return Task.FromResult(JsonConvert.SerializeObject(new { status = "cancel_requested" }));
    }

    [RequiresUnreferencedCode("Calls Newtonsoft.Json.JsonConvert.SerializeObject(Object)")]
    private static async Task RunFairySeedSearchAsync(FairySearchJob job, bool useLegacyRandom, int day)
    {
        const long maxSeedExclusive = (long)int.MaxValue + 1;
        const int chunkSize = 50_000;
        const int chunksPerYield = 2;
        long nextSeed = 0;

        try
        {
            List<Task> workers = new(job.WorkerCount);
            for (int worker = 0; worker < job.WorkerCount; worker++)
            {
                workers.Add(Task.Run(async () =>
                {
                    while (!job.CancellationTokenSource.IsCancellationRequested)
                    {
                        long chunkStart = Interlocked.Add(ref nextSeed, chunkSize) - chunkSize;
                        if (chunkStart >= maxSeedExclusive)
                        {
                            break;
                        }

                        int threadId = Thread.CurrentThread.ManagedThreadId;
                        job.ThreadIds.TryAdd(threadId, 0);

                        long chunkEnd = Math.Min(chunkStart + chunkSize, maxSeedExclusive);

                        for (long candidate = chunkStart; candidate < chunkEnd; candidate++)
                        {
                            if (job.CancellationTokenSource.IsCancellationRequested)
                            {
                                return;
                            }

                            bool isFairy = NightEvent1_6.GetEvent(useLegacyRandom, candidate, day) == NightEvent1_6.Event.Fairy;
                            if (!isFairy)
                            {
                                continue;
                            }

                            int rank = Interlocked.Increment(ref job.FoundCount);
                            if (rank <= job.TargetCount)
                            {
                                job.MatchingSeeds.Add((int)candidate);
                                if (rank == job.TargetCount)
                                {
                                    job.CancellationTokenSource.Cancel();
                                    return;
                                }

                                continue;
                            }

                            job.CancellationTokenSource.Cancel();
                            return;
                        }

                        // Yield periodically so browser UI can repaint between polling ticks.
                        if (Interlocked.Increment(ref job.ProcessedChunks) % chunksPerYield == 0)
                        {
                            await Task.Yield();
                        }
                    }
                }));
            }

            await Task.WhenAll(workers);

            job.FinalSeeds = BuildSortedSeeds(job.MatchingSeeds, job.TargetCount);
            job.Status = job.CancelRequestedByUser ? "cancelled" : "completed";
        }
        catch (Exception ex)
        {
            job.ErrorMessage = ex.Message;
            job.Status = "failed";
        }
        finally
        {
            job.CancellationTokenSource.Dispose();
        }
    }

    private static int[] BuildSortedSeeds(ConcurrentBag<int> matchingSeeds, int maxCount)
    {
        List<int> result = new(matchingSeeds);
        result.Sort();
        if (result.Count > maxCount)
        {
            result = result.GetRange(0, maxCount);
        }

        return result.ToArray();
    }
}