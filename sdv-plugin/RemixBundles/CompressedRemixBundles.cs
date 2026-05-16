// Class used to translate 64 bit mask to bundle item ids
using System;
using System.Collections.Generic;
using System.Numerics;
using System.Reflection;

namespace sdv_plugin.remixedbundles;

public abstract class ICompressedRemixBundles
{
    public UInt128 State;
    public ICompressedRemixBundles(UInt128 state) { State = state; }

    public bool Satisfies(UInt128 requirement)
    {
        return (requirement & State) == requirement;
    }

    public bool Contains(UInt128 requirement)
    {
        return (requirement & State) != 0;
    }

    public abstract List<string> GetFields();
    public override string ToString()
    {
        return string.Join("\n", GetFields());
    }
}
