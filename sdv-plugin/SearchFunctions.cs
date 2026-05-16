using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Runtime.InteropServices.JavaScript;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using sdv_plugin.remixedbundles;
using SeedFinding.NightEvents;

namespace SeedFinding;

public partial class SearchFunctions
{
    private const int MaxAllowedSeedResults = 10000;
    private const int CHUNK_SIZE = 50_000;
    private const long maxSeedExclusive = (long)int.MaxValue + 1;
    private static readonly ConcurrentDictionary<string, SeedSearchJob> SeedSearchJobs = new();

    private sealed class SeedSearchJob
    {
        internal SeedSearchJob(int workerCount, int targetCount, CancellationTokenSource cancellationTokenSource)
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
    internal static Task<string> StartSeedSearch(string searchJson, int maxResults, int requestedWorkers)
    {
        int availableWorkers = Math.Max(1, Environment.ProcessorCount);
        int workerCount = requestedWorkers <= 0
            ? availableWorkers
            : Math.Clamp(requestedWorkers, 1, availableWorkers);
        int targetCount = Math.Clamp(maxResults, 1, MaxAllowedSeedResults);
        string searchId = Guid.NewGuid().ToString("N");

        CancellationTokenSource cts = new();
        SeedSearchJob job = new(workerCount, targetCount, cts);

        var searchRequest = JsonConvert.DeserializeObject<RemixSearchRequest>(searchJson);

        SeedSearchJobs[searchId] = job;
        job.SearchTask = Task.Run(() => RunSeedSearchAsync(job, searchRequest));

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
    internal static Task<string> GetSeedSearchStatus(string searchId)
    {
        if (!SeedSearchJobs.TryGetValue(searchId, out SeedSearchJob job))
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
                    totalChunks = (maxSeedExclusive / CHUNK_SIZE) + 1, // based on chunk size in RunSeedSearchAsync
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
    internal static Task<string> CancelSeedSearch(string searchId)
    {
        if (!SeedSearchJobs.TryGetValue(searchId, out SeedSearchJob job))
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
    private static async Task RunSeedSearchAsync(SeedSearchJob job, RemixSearchRequest searchRequest)
    {
        searchRequest.Initialize();
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
                        long chunkStart = Interlocked.Add(ref nextSeed, CHUNK_SIZE) - CHUNK_SIZE;
                        if (chunkStart >= maxSeedExclusive)
                        {
                            break;
                        }

                        int threadId = Thread.CurrentThread.ManagedThreadId;
                        job.ThreadIds.TryAdd(threadId, 0);

                        long chunkEnd = Math.Min(chunkStart + CHUNK_SIZE, maxSeedExclusive);

                        for (long candidate = chunkStart; candidate < chunkEnd; candidate++)
                        {
                            if (job.CancellationTokenSource.IsCancellationRequested)
                            {
                                return;
                            }

                            bool isValid = searchRequest.IsValid((int)candidate);
                            if (!isValid)
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