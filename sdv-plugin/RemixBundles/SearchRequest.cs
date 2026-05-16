using System;
using System.Collections.Generic;

namespace sdv_plugin.remixedbundles;

public class RemixSearchRequest
{
    public bool useLegacyRandom;
    public List<string> enabledFlags;
    public List<string> disabledFlags;
    public UInt128 requiredFlags;
    public UInt128 excludedFlags;

    public void Initialize()
    {
        requiredFlags = RemixedBundles.CollapseFlags(enabledFlags);
        excludedFlags = RemixedBundles.CollapseFlags(disabledFlags);
    }

    public bool IsValid(int seed)
    {
        var result = RemixedBundles.Generate(useLegacyRandom, seed);
        return result.Satisfies(requiredFlags) && !result.Contains(excludedFlags);
    }
}