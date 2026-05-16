using System;
using System.Collections.Generic;

namespace sdv_plugin.extensions;

public static class RandomExtensions
{
    public static T ChooseFrom<T>(this Random random, IList<T> options)
    {
        if (options == null || options.Count <= 0)
        {
            return default(T);
        }
        return options[random.Next(options.Count)];
    }
}