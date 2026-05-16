// Generator class for Compressed Bundle Configurations
using System;
using System.IO;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Numerics;
using System.Diagnostics.CodeAnalysis;
using sdv_plugin.extensions;
using RemixData1_6 = sdv_plugin.remixedbundles.v1_6.RemixData;
using sdv_plugin.remixbundles;

namespace sdv_plugin.remixedbundles;

public class RemixedBundles
{
    public static IRemixData Data;

    public static void SetVersion(string version)
    {
        if (version != "1.6")
        {
            throw new Exception("Invalid version");
        }
        Data = new RemixData1_6();
        RemixData1_6.Initialize();
    }

    public static UInt128 CollapseFlags(List<string> flags)
    {
        return Data.CollapseFlags(flags);
    }

    public static ICompressedRemixBundles Generate(bool legacy, int seed)
    {
        Random random = Utility.CreateRandom(legacy, (double)seed * 9.0);
        var result = Data.NewResult();
        Span<int> bundleGroup = stackalloc int[6]; // maximum number of optional bundles to select from
        Span<int> bundleIndex = stackalloc int[6]; // maximum number of optional bundles to select from
        Span<int> optionIndex = stackalloc int[12];

        static void init_options(Span<int> optionIndex, int count)
        {
            for (int i = 0; i < count; i++)
            {
                optionIndex[i] = i;
            }
        }
        static int select_and_swap(Span<int> options, int max_val, Random random)
        {
            int option = random.Next(max_val);
            int return_val = options[option];
            // shift values down
            for (int k = option + 1; k < max_val; k++)
            {
                options[k - 1] = options[k];
            }
            options[max_val - 1] = -1;
            return return_val;
        }
        foreach (var room in Data.Rooms)
        {
            bundleGroup.Clear();
            bundleIndex.Clear();
            int index = 0;
            if (room.hasBundleSet) random.Next(); // does a random.choosefrom but there's only ever 1 bundle set
            for (int i = 0; i < room.defaultBundles.Count; i++)
            {
                bundleGroup[index] = -1;
                bundleIndex[index] = i;
                index++;
            }
            for (int groupIndex = 0; groupIndex < room.optionalBundleGroups.Count; groupIndex++)
            {
                OptionalBundleGroup group = room.optionalBundleGroups[groupIndex];
                init_options(optionIndex, group.bundles.Count);
                for (int j = 0; j < group.pick; j++)
                {
                    int groupBundle = select_and_swap(optionIndex, group.bundles.Count - j, random);
                    bundleGroup[index] = groupIndex;
                    bundleIndex[index] = groupBundle;
                    index++;
                }
            }

            for (int i = 0; i < index; i++)
            {
                // add the selected bundle to the result
                BundleData data;
                if (bundleGroup[i] == -1)
                {
                    data = room.defaultBundles[bundleIndex[i]];
                }
                else
                {
                    data = room.optionalBundleGroups[bundleGroup[i]].bundles[bundleIndex[i]];
                }
                result.State |= data.flagValue;

                // need to add sub bundle flags
                switch (data.optionGroups.Count)
                {
                    case 0:
                        continue;
                    case 1:
                        // need to pick down to correct number of options
                        var group = data.optionGroups[0];
                        int pick_count = data.optionGroups[0].pick;
                        init_options(optionIndex, group.options.Count);

                        // removing out until the pick limit
                        for (int j = group.options.Count; j > pick_count; j--)
                        {
                            select_and_swap(optionIndex, j, random);
                        }

                        for (int j = 0; j < pick_count; j++)
                        {
                            result.State |= group.options[optionIndex[j]].flagValue;
                        }
                        break;
                    default:
                        // this works backwards due to how the random item parse would typically work
                        for (int j = data.optionGroups.Count - 1; j >= 0; j--)
                        {
                            var options = data.optionGroups[j].options;
                            var subIndex = random.Next(options.Count);
                            result.State |= options[subIndex].flagValue;
                        }
                        break;
                }
            }
        }
        return result;
    }
}