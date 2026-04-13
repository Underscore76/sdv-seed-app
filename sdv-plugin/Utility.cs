using System;
using StardewValley.Hashing;

namespace sdv_plugin;

public static class Utility
{
    public static IHashUtility Hash { get; } = new HashUtility();

    public static Random CreateDaySaveRandom(bool useLegacyRandom, int days, long gameId, double seedA = 0.0, double seedB = 0.0, double seedC = 0.0)
    {
        return Utility.CreateRandom(useLegacyRandom, days, gameId / 2, seedA, seedB, seedC);
    }

    public static Random CreateRandom(bool useLegacyRandom, double seedA, double seedB = 0.0, double seedC = 0.0, double seedD = 0.0, double seedE = 0.0)
    {
        return FastRandom.createFR(Utility.CreateRandomSeed(useLegacyRandom, seedA, seedB, seedC, seedD, seedE));
    }

    public static int CreateRandomSeed(bool useLegacyRandom, double seedA, double seedB, double seedC = 0.0, double seedD = 0.0, double seedE = 0.0)
    {
        if (useLegacyRandom)
        {
            return (int)((seedA % 2147483647.0 + seedB % 2147483647.0 + seedC % 2147483647.0 + seedD % 2147483647.0 + seedE % 2147483647.0) % 2147483647.0);
        }
        return Hash.GetDeterministicHashCode((int)(seedA % 2147483647.0), (int)(seedB % 2147483647.0), (int)(seedC % 2147483647.0), (int)(seedD % 2147483647.0), (int)(seedE % 2147483647.0));
    }
}
