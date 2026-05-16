using System;
using System.Collections.Generic;
using System.Numerics;
using sdv_plugin.remixedbundles;

namespace sdv_plugin.remixbundles;

public class BundleOption
{
    public string objectId;
    public string flag;
    public UInt128 flagValue;
    public BundleOption() { }
    public BundleOption(string objectId, string flag, UInt128 flagValue)
    {
        this.objectId = objectId;
        this.flag = flag;
        this.flagValue = flagValue;
    }
}
public class OptionGroup
{
    public string id;
    public int pick;
    public List<BundleOption> options = [];
}
public class BundleData
{
    public string id;
    public string flag;
    public UInt128 flagValue;
    public List<OptionGroup> optionGroups = [];
    public BundleData() { }
    public BundleData(string id, string flag, UInt128 flagValue)
    {
        this.id = id;
        this.flag = flag;
        this.flagValue = flagValue;
    }
}

public class OptionalBundleGroup
{
    public string id;
    public int pick;
    public List<BundleData> bundles = [];
}

public class DefaultBundle : BundleData
{
    public DefaultBundle() { }
    public DefaultBundle(string id) : base(id, null, 0) { }
}

public class RoomData
{
    public string Name;
    public bool hasBundleSet;
    public List<OptionalBundleGroup> optionalBundleGroups = [];
    public List<DefaultBundle> defaultBundles = [];
    public RoomData(string name, bool hasBundleSet) { this.Name = name; this.hasBundleSet = hasBundleSet; }
}

public abstract class IRemixData
{
    public abstract List<RoomData> Rooms { get; }
    public abstract ICompressedRemixBundles NewResult();
    public abstract UInt128 CollapseFlags(List<string> flags);
}