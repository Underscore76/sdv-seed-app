using System;
using System.Data.HashFunction;
using System.Text;

namespace StardewValley.Hashing
{
    /// <inheritdoc cref="T:StardewValley.Hashing.IHashUtility" />
    public class HashUtility : IHashUtility
    {
        /// <summary>The underlying hashing API.</summary>
        private static readonly IHashFunction Hasher = (IHashFunction)new xxHash(32);

        /// <inheritdoc />
        public int GetDeterministicHashCode(string value)
        {
            byte[] data = Encoding.UTF8.GetBytes(value);
            return this.GetDeterministicHashCode(data);
        }

        /// <inheritdoc />
        public int GetDeterministicHashCode(params int[] values)
        {
            byte[] data = new byte[values.Length * 4];
            Buffer.BlockCopy(values, 0, data, 0, data.Length);
            return this.GetDeterministicHashCode(data);
        }

        /// <summary>Get a deterministic hash code for a byte data array.</summary>
        /// <param name="data">The data to hash.</param>
        public int GetDeterministicHashCode(byte[] data)
        {
            return BitConverter.ToInt32(Hasher.ComputeHash(data), 0);
        }
    }

    /// <summary>Combines hash codes in a deterministic way that's consistent between both sessions and players.</summary>
    /// <remarks>This avoids <see cref="M:System.String.GetHashCode" /> and <c>HashCode.Combine</c> which are non-deterministic across sessions or players. That's preferable for actual hashing, but it prevents us from using it as deterministic random seeds.</remarks>
    public interface IHashUtility
    {
        /// <summary>Get a deterministic hash code for a string.</summary>
        /// <param name="value">The string value to hash.</param>
        int GetDeterministicHashCode(string value);

        /// <summary>Get a deterministic hash code for a set of values.</summary>
        /// <param name="values">The values to hash.</param>
        int GetDeterministicHashCode(params int[] values);
    }
}