using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;


public partial class FileProcessor
{
    [JSExport]
    internal static async Task<int> ProcessFile(byte[] file)
    {
        await Task.Delay(100); // emulate work
        return file.Length;
    }
}