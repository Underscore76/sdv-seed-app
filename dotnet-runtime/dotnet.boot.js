export const config = /*json-start*/{
  "mainAssemblyName": "sdv-plugin.dll",
  "resources": {
    "hash": "sha256-D9wKHKVm/TpQmT6HERZAiWUupl86mQgFlP2TVwMxVeE=",
    "jsModuleWorker": [
      {
        "name": "dotnet.native.worker.mjs"
      }
    ],
    "jsModuleNative": [
      {
        "name": "dotnet.native.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.wasm",
        "integrity": "sha256-2U+rxAjG2ahvtf562PIIsubHFDAY0YZM3KDscCUBIfE="
      }
    ],
    "wasmSymbols": [
      {
        "name": "dotnet.native.js.symbols"
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wasm",
        "integrity": "sha256-dzpFXQ8/4g3WGo8mpvm/Unka8TnKqda/KKRTGUT6gKo="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.wasm",
        "integrity": "sha256-V2BEB2Mr3Wt9tI2bvAkAB7EQTaHwLeTI9qzZoB1R1zw="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "integrity": "sha256-dyos3soeLGLWuWmlQOYKUNEgDCywzCh8LX1E3/1bJVU="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.wasm",
        "integrity": "sha256-2AAR/+dObI+bFn2Kf2fnAGtTXsbNM/IogjbCwZ4/lD4="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.wasm",
        "integrity": "sha256-2SFAcF4QBuxy8mlfKrkIqDguSMq1/fzLUDn36gs/W8A="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wasm",
        "integrity": "sha256-gHePoHoSqAa3mm1SeywgGXbAHijxaAJdxsAopq/tWns="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.wasm",
        "integrity": "sha256-RuwO3kJunf93waKm24rKHw8BE/Ou2/E9E58i+R8U7bY="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Newtonsoft.Json.wasm",
        "name": "Newtonsoft.Json.wasm",
        "integrity": "sha256-s8KVuknfxWl1cuDvQM/OnpBfnpM1rxzvzq21S1cF36U="
      },
      {
        "virtualPath": "System.Data.HashFunction.Core.wasm",
        "name": "System.Data.HashFunction.Core.wasm",
        "integrity": "sha256-3YprGn/1R4FTGYaI3OFl05aR23TZBkAQUJwwMPf90GI="
      },
      {
        "virtualPath": "System.Data.HashFunction.Interfaces.wasm",
        "name": "System.Data.HashFunction.Interfaces.wasm",
        "integrity": "sha256-WKq+JMV8/cvYIZzGp0TRiMNYNo4q6pE8Oi2cQhSAyhQ="
      },
      {
        "virtualPath": "System.Data.HashFunction.xxHash.wasm",
        "name": "System.Data.HashFunction.xxHash.wasm",
        "integrity": "sha256-ZE+XJxo5lczBhr2ELV12hGz/z5yPVanRGTcKLcG45bI="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.wasm",
        "integrity": "sha256-qI8x1zR8xZT7o0t2zwwcmAEGPfyZIHRH0Os6hiHJS2g="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.wasm",
        "integrity": "sha256-vWy86fZ2jrmML8i9uG6vpskGWNYsPobE7GNKaElcK+0="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.wasm",
        "integrity": "sha256-TaKBjR51XLJb2PIo8OsUrQyrnjijpg4dE22qOC/odlM="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.wasm",
        "integrity": "sha256-YGn4fpMAB6rVM3jBLd0Ls3FKkhUN/XzkCZerbjKPCFQ="
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.wasm",
        "integrity": "sha256-sinZAashymf16TV/TJcbeDp0w84/AvwQd3GjkUofxXU="
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.wasm",
        "integrity": "sha256-/r2mIP99iJhZh+H7qzKreHvUN124Hpvx8VQVL153+DA="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.wasm",
        "integrity": "sha256-+iDgAF9PtIHWe2dO+xAT40YPLenBJIBcAzxtX+LiH5g="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.wasm",
        "integrity": "sha256-UoSXJJLA1WOclL6V5l+j6fsn8AIU2zyP8e4+WqHARiE="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.wasm",
        "integrity": "sha256-eCf3yNlNqdcdcPGQPg4IHLMGVNGHK1MWCUM3vatUZ8Q="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.wasm",
        "integrity": "sha256-mBs6H0JxWwAf/TSA96YAGdrbEuD1rzwQCrDyeeXWf74="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.wasm",
        "integrity": "sha256-yKGfz9VP+u6xJaoq0kwZgNGHw8Yq68mBa1UviKl9+Zg="
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.wasm",
        "integrity": "sha256-7asbHrFHUGGCub/8B5yu8IhIYWWPHx2Pp2lpuOLMq9o="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.wasm",
        "integrity": "sha256-9vgmzw0BDaOQ2PtjeI0DAoi9z/nlUVPflx8eqjRdD38="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wasm",
        "integrity": "sha256-fosXsxXbJuBmXUV2VMWlI0jZsySyUeihq2/jlJhcGF4="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.wasm",
        "integrity": "sha256-Jr7BJQdvjrZ3QD5DKD4j6P2dJCeBDPXdXiZ0KlRdWco="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.wasm",
        "integrity": "sha256-9gzZfUDJ0ufIZyrdScgqPEFkjPgo0MIHyBlHboBM7KQ="
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.wasm",
        "integrity": "sha256-bXjftCUa8kGxdOVzIp+sEQbr/CjIOjXYCs5L/77ufQU="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.wasm",
        "integrity": "sha256-ReHhOT1vzMgY6tjmti4nvr5JCwGiPCnAY2vGXnndMMI="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.wasm",
        "integrity": "sha256-jAAnGJlRJ/k/1hpp6w0L8xc1KzwQnyeg6HZULOv6Ee4="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.wasm",
        "integrity": "sha256-MPX1Tomc153UbI/JP7RTe2NNGGtrO6n7g9hcr0+NXk4="
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.wasm",
        "integrity": "sha256-dye0vFa+ZoGZX4D1zyaAGLdUEjpEGDxIHDwPZH8uL4A="
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.wasm",
        "integrity": "sha256-WeNDy8Dg7Lk2zd4kBeFF1IBX2aArmhW6VPGVqURfLIQ="
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.wasm",
        "integrity": "sha256-UrPTtUepqWVEjVnJvtkLRDbLJkgczQESW4/86y2U5JE="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.wasm",
        "integrity": "sha256-Uh+ZcinJKjFTWgTT+AlkXhc9bpsVehsi27YCvBN3g4g="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.wasm",
        "integrity": "sha256-sDg7Uzjnb8IAlZ8RbPJKm3DcXmBz2EmLRg251rERMEc="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.wasm",
        "integrity": "sha256-ALV7jJpaVcDzfTp4s+VJsVEfds/FdMFrU9Yu0d68Ck4="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.wasm",
        "integrity": "sha256-87qMRUyI/yWzglHnmUlgzJCB1L5nKBLE5t0eMNGHvWk="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.wasm",
        "integrity": "sha256-iqo7VVHfeDv/RGRt80IPR0cgwBfDWeSPurROcNMtjCQ="
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.wasm",
        "integrity": "sha256-9rxh6TqQmUbRCCgjXZoU1/6ORMu3I6iXk3w28M6acC8="
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.wasm",
        "integrity": "sha256-wMJeVy0r09tdEK4PT0pjKM0sRx8XOTOEch4cF15ZpBE="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.wasm",
        "integrity": "sha256-7s5WVXu/IBCPcc5dacceqUKGTnnmoeBVLpjvvDHN6zs="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.wasm",
        "integrity": "sha256-V378uSUir93GPIstwsIK2WNSGZwtt4QEuR7MnZdjcHo="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.wasm",
        "integrity": "sha256-sGGZS12uCPIfOHQyOfpT0PDGOeUw2Fdp/413ZTob07U="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.wasm",
        "integrity": "sha256-/1gug1Ht0MR5wkSh5F+J2kc7H0pgOg99nHrS/U4gu2I="
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.wasm",
        "integrity": "sha256-8r4Gcc75TWtDzR5ea3NAqpujLpas8JLeZOUT1v44IUQ="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.wasm",
        "integrity": "sha256-8dbpG6+AvMYqSjdWJ9LnxeRWtfGwmcD/PnMFzuOxzK0="
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.wasm",
        "integrity": "sha256-rxwyBAP+8LmUcT/Y0STjxdVWDhVJC1kldNQWclQAoJE="
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.wasm",
        "integrity": "sha256-jkCO5UhqHD1be0llpamY9HPLjlBwmogSEDTkLSyrqUo="
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.wasm",
        "integrity": "sha256-e/eL04Tm4VAmYK6KaPvwiMDgHiXmLneMpgn6dwOvoIQ="
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.wasm",
        "integrity": "sha256-jE4z6oYu95YoHlXsD8JIoZ142/COHps6Bmnb3oVlC2I="
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.wasm",
        "integrity": "sha256-7opZritVQEYR7FVPNkdboWKXy2k4SyJIYbQnJrfR8UY="
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.wasm",
        "integrity": "sha256-5ZQ67OVzx1GQaKQLOeayqNtX4NoP5DW2hslwSz1QXiM="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.wasm",
        "integrity": "sha256-m3j06SBRZTBr2j90oi804y2OFYq4VmUs+QlYR0pGZLk="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.wasm",
        "integrity": "sha256-DIExnZSsDs83cEVRdUbzjlqe9sGtr71aNu4u+ZhAtYY="
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.wasm",
        "integrity": "sha256-kOYCxzUNpEjnN3BN4NJNkGSDWdwJtpPw/3P75sklPsg="
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.wasm",
        "integrity": "sha256-2dd/IRmG6yqPNLXemLlJ/EtHWJ69u4gqQwed45td5iU="
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.wasm",
        "integrity": "sha256-UmHG/C2rYAoM3jtPn4R3/Ay38ECMxWJcTv4YzZhIYyI="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wasm",
        "integrity": "sha256-g7/3S8TlPd9P37bGrc1kFawutrlA3x0lp9/E2aSZdsg="
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.wasm",
        "integrity": "sha256-L8F4/NYQ5/NVb6n7oqGjittOCpTSqQ6u3BjCsXUJisM="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.wasm",
        "integrity": "sha256-TDqU8hAmJvd+0H+XDRmqzbk2YkViCDAcfK8mlcT/5u4="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.wasm",
        "integrity": "sha256-WuAoiEXy7IYaK8gAmXOZRJR8v5lD29rbdUMjRqBGJUk="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.wasm",
        "integrity": "sha256-VjKTSsw4R3tDeRwKXw8L2BxmkzpZgt/JWljyPN0HRqM="
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.wasm",
        "integrity": "sha256-qW12/DgaAi5b+fpbUJmzH87WzPXm3Fy6micoQU4mzCE="
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.wasm",
        "integrity": "sha256-gR6HddfEsMBemhHfHGrt9hl8aY6K5mKyxa07iixZXlg="
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.wasm",
        "integrity": "sha256-gT91sKIfygQaZ9vkzKRSKK4LvVzHwVedRkkp0Pfa0F4="
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.wasm",
        "integrity": "sha256-akcNLHUsdebAMHrxAYCV/H6BoEeZYBIGpp+Wp7CYJSw="
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.wasm",
        "integrity": "sha256-VAkeSeC4p1GES8hvFcOK8w+65ZTmDdAbbLIL4zX5T48="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.wasm",
        "integrity": "sha256-IFc8j2OJqBJYMshhomqGcyqauGqfhq4KWrNPqoTSGkA="
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.wasm",
        "integrity": "sha256-WiTW1cCGj9bgLtBOYEyooxBconeF8SQ1S2iro4IdYLk="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.wasm",
        "integrity": "sha256-geFlo3mx7Fy4jEOfa1szXQXkLw20bnYcuBLLVLluEEM="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.wasm",
        "integrity": "sha256-f1wo8JHk5OxZczStVC/MjjaT4OJ6cx/2+Hcz1mLoYeA="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.wasm",
        "integrity": "sha256-a/5wDlZ5S+CAY0h6zpvZF3vtTaRHv03A/FEOIWGnIrw="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.wasm",
        "integrity": "sha256-H8rrK/mJCEPyvxADWjnHOUWZLmI5LKpzgg+Nm8qCre0="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.wasm",
        "integrity": "sha256-7oirJ0XsmvBojn1MQqXn7KO6CPhBlc/oKyTVqNpzc0c="
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.wasm",
        "integrity": "sha256-rXZFgUW0v726aXDEjtobpEUHiur/egvWciebswh83pE="
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.wasm",
        "integrity": "sha256-tgCPfswJg6u/TM5umZi2C5V3IYUPRK9rxiKkf51iTzk="
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.wasm",
        "integrity": "sha256-a9WehA9NpMugsS2YEWWiuuSnAUm6S961wESCFfYHMGs="
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.wasm",
        "integrity": "sha256-ZAR9QVlpUvh4/EQSGZMQxi2g1hDGyGIdupJXCDLHrt8="
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.wasm",
        "integrity": "sha256-MLlkgkZbPgdL0Cm83IFdtf1tlum1sMeYD1u5Syl+X0s="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.wasm",
        "integrity": "sha256-fMD1M+LzoYuL3Z8woZXrgr7TWATzvi4kdR92pTY+56s="
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.wasm",
        "integrity": "sha256-1AVMwwYA71Pny3jB5iq4ptl4z6hg38n5f2Y+VZ93uBA="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.wasm",
        "integrity": "sha256-ZT333Ng2GK/Z3hOnS6JKcccs/GkN6j+YHpbi7SNCu88="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.wasm",
        "integrity": "sha256-TnnWesp499tqC2Fh5lxyIhfC0JlFkcSdGo+oUiptcoQ="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.wasm",
        "integrity": "sha256-Qa4qeG6luT6eaB+xDTb/+ot6Py+/K3/gBPRmA/0F2Ho="
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.wasm",
        "integrity": "sha256-rfC31myqS6LNlAL4WjPesdfsAuPezjX/GhMJeXEclOg="
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.wasm",
        "integrity": "sha256-olBBLxzHFaVDMyIk/vsKfWT2pPiEOfEDBOfqUvfExHo="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.wasm",
        "integrity": "sha256-YgDGVpDgYfND/OnpdQ3Lh73I2mSrAkYunGBs2A+21lk="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.wasm",
        "integrity": "sha256-132kZUevDfV/PbTb42SxRVMeC6mV9Nh8eB+zINB3QVE="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.wasm",
        "integrity": "sha256-UzukfIgTmjE0J7tXX9/+wYT7Ma5CP7h4E26PrsA7Uok="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.wasm",
        "integrity": "sha256-HXuciPICAUe7mHoIk/JMl/o7n+F0QV6LcPhlCn2XWk4="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.wasm",
        "integrity": "sha256-1SrBg89TmJRX1mFY0vCVRlY2NTmPLw3MXjQaMOz15gE="
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.wasm",
        "integrity": "sha256-E5FBFR/BK5YE21gsS0MSt1NYCv+B7XsWwYuALQkVuCU="
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.wasm",
        "integrity": "sha256-rYCR6jikjj2sVpsEStUTImae4WQXiACtPK4vOPCDVFY="
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.wasm",
        "integrity": "sha256-ZHvmyqwmpFZnXLrPpv83lB7b48meNt/DbTrtsmf1ZZk="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.wasm",
        "integrity": "sha256-BAIg4cpEfut5uSavwkp9L0mlWfMq2UEnGKCx5g/yGGU="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.wasm",
        "integrity": "sha256-qV0RVzpTMIGzv8I5z6Jkytgz/TW/wOmjjxCb3Z/+QNs="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.wasm",
        "integrity": "sha256-WPFRPmBhYZDWRkwT93DZAM8U9bRM1LLqBe2eTXcRtnk="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.wasm",
        "integrity": "sha256-aOOKCMfgi1RFwluA96JWD63Gpvyup/hKYoevTxf2MH0="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.wasm",
        "integrity": "sha256-xLYwtizrGok0g4SL+TvlRaw6UJVHJogbubF3nVxUDo0="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.wasm",
        "integrity": "sha256-mZv466MbDX3jRN79lY927Gvz1sFuW8RMdiC2ISqDaME="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.wasm",
        "integrity": "sha256-cKKb5YR09I7jZS4wd2nSgQZyngHuWeEGWO6xma/SCfM="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.wasm",
        "integrity": "sha256-DVvVU3i82MtXshujgOwrBLs3ipM+nK20HaNV9QL2ogE="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.wasm",
        "integrity": "sha256-2u3IaIqbIqfllHgFkefWjjhMbEu0k15jzmTJ8D9eNKE="
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.wasm",
        "integrity": "sha256-xrhszywGQG+wwsJZzyomqh7EOs5qQPDNOeH2zZ+KKQo="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.wasm",
        "integrity": "sha256-/VBYNOtdOexweQErUQv2O4GXFMr3V6AnRUnjdCVgId0="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.wasm",
        "integrity": "sha256-vH7LUH9x8oWEH4eUOVIPdaeVSGwQvDU0W9ZimAm/NEI="
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.wasm",
        "integrity": "sha256-jitV/U8+57r3pUtjp0olnszwzR4QuSGgWrquliEMtZE="
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.wasm",
        "integrity": "sha256-MSQYohCn9/DoyWxFSL7hGyOapz5ZCcgEsRdLzBFCvfw="
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.wasm",
        "integrity": "sha256-QIZr7nLJ8V/WnrQ6BYoMuFwmTaRZG3si0S3BKhDKLs8="
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.wasm",
        "integrity": "sha256-61Av8KxvIFskB17avqBj40FGVFdlZgVEs1IC32JV/rw="
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.wasm",
        "integrity": "sha256-EdRFcTz5nnQrjYyjfH0/HOHvq3jyUW6Z6hXyHeIyKjw="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wasm",
        "integrity": "sha256-M7zXYL4+jZyj3Tm3H02CGpQClvGG/pHFqN5yjRMvtQc="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.wasm",
        "integrity": "sha256-b6UivS+o/g3h/yu7ejf99+R8py4W0IajCjh0M50hLTM="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.wasm",
        "integrity": "sha256-8fo+Ja3EpiHHVqHRlzQEssrHu6TH8zKkvhrpAUEicQ8="
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.wasm",
        "integrity": "sha256-+GypCIGPa6k37qKyuT/ABSbQDeb4XCC6oTS/N5KizyQ="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "integrity": "sha256-Qh7ZqBDPWSSFqD2ZdvOu6/vgXn8qyBEjO0+BJZwbL8s="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.wasm",
        "integrity": "sha256-gADJYJHsCzlOo4BfnJvqE7QtAq5lrM2hOspumkEDFTY="
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.wasm",
        "integrity": "sha256-3MhUfbEBdmTjV7owiHABLlyrATxkeicgazbZTW113Rs="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.wasm",
        "integrity": "sha256-t56y1vcMwkcl2rh83mRabUpM2Scc+9dNFftxYiw3CpY="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.wasm",
        "integrity": "sha256-Vp5dD4sUKJONaL8mIG5kU4zqublwL4IGCFsd+ImCKO4="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.wasm",
        "integrity": "sha256-jpU0CUITUq7dwLZGEt/y4yZNiJ6Nd4SMykHb6o0L+l8="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.wasm",
        "integrity": "sha256-vzj6j2yXEVraAtKDd2KVXbGeWshCIn51xXZ4B1M5oxw="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.wasm",
        "integrity": "sha256-hyGupfalhHC0lDaO+QsV2zCw9Muov1CPZRzKgNtH5LY="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.wasm",
        "integrity": "sha256-0hCbtSKuV6vNV89PlSAZBeQaLDLgK+pf3VST11vcFO0="
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.wasm",
        "integrity": "sha256-un6iBq696YnialtGGZrJNd0+LNCi87cH4jmSf0lukFk="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.wasm",
        "integrity": "sha256-7ThmsKk9eQjv5nWbOgT6WIQWcAwKwlaWH+8R9cvcCVk="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.wasm",
        "integrity": "sha256-1PMsmuwuaKqrYIirgpvUZ3NTundQDyIQYDEeyceEhmA="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.wasm",
        "integrity": "sha256-KxVd6UVj4Gz7ZptBX1C4kT3zeBnBz5dutUkDFAfPmoA="
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.wasm",
        "integrity": "sha256-CCQG3oTGklkKvqz1o8GFYJU7QliJ9Y8dcYeOKbSsaX0="
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.wasm",
        "integrity": "sha256-SxZmS8g/r93tD/sRxNM9osIYyVx72z/H/rqmMQdWNug="
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.wasm",
        "integrity": "sha256-EtTJD2JK0Rt7JYIikmhcCxm2nwff+fVOWVzvr4obB8M="
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.wasm",
        "integrity": "sha256-7G90o69YXrWL2H1YqPGejQvqkGaMyT9s+Y9N1+ZMLFU="
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.wasm",
        "integrity": "sha256-nKLRyR6/3ScZM8qqaWqHcZzyIFcnaEJxR+Qt4dPR3+o="
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wasm",
        "integrity": "sha256-kxwYxDrmQQt2a96PZSY+c5m2Bd3resehAaairZJxAZ0="
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.wasm",
        "integrity": "sha256-+8YtZ824bFWT6xBDxcp29g5VozHkSh7gxEJ9wTTGBV8="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.wasm",
        "integrity": "sha256-YTB50qLxW3FHhVgNVtqxug0aR8MKoHCpyfRywlOOqMM="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.wasm",
        "integrity": "sha256-NzMv/gYogSkXi7nAeibdZqkHbd5o2GJwbyQ4eDOVdYQ="
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.wasm",
        "integrity": "sha256-KfroySmqVcPGmn3QTpWgL3vo/r5Am7IcbwbX4KAd4no="
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.wasm",
        "integrity": "sha256-Z5MYQrjlu4RgNAwl13nxDkVif68msW3P3UY5NefH6hY="
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.wasm",
        "integrity": "sha256-qFTNZPpD22AMNoP6hp/1th6RcChMCwzt/hUrP6c6ZNk="
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.wasm",
        "integrity": "sha256-0RYujx3hOaqcdMkxqVRlvwMJE3Eiia09EOgy8iVHtOY="
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.wasm",
        "integrity": "sha256-nvYNz4JxrW9EbrDAIte/TKIWH7NPDyEzw5uwY/9FWXU="
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.wasm",
        "integrity": "sha256-nIMU74re2s2YH+3JuTStexs6vW44sGVJdfrmo+E4c7A="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.wasm",
        "integrity": "sha256-U6LD28f9sHg4kzw2cMEfWxpthUrOIete2tXviWhUx1g="
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.wasm",
        "integrity": "sha256-gAC6dsyYsYCAhTW1sdCHpEWfvNsGbkfozQG2c7424fg="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.wasm",
        "integrity": "sha256-dI/4i50J3daDsGvQXTtXTvZL1Z4OwhmVoH1Kv1sQPeE="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.wasm",
        "integrity": "sha256-BheU4fr2y3m4UHghRCAS+s8H+Fm0hqcn2tSLmH65gFY="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.wasm",
        "integrity": "sha256-FbVJnY8ASEAyUo17q0mlbx0dQ+i1bc7CWoGnfaKsWTQ="
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.wasm",
        "integrity": "sha256-c+f1xwX2mwd1HivDicXVo53sg3M6plnOA0lZsmE+I0s="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.wasm",
        "integrity": "sha256-rRz/ZSPI0wJgJZnK4Ief5rwBAG33vgOCL47icS5blVQ="
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.wasm",
        "integrity": "sha256-zVYaG7rbWlASjPs2s6rD3fHGXHa5HBqIcKlnUo8qx9k="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.wasm",
        "integrity": "sha256-Fq36YR8JxdzQSY7Z47jZ/s+E1fqJ3WxAJr+JZt4vPu4="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.wasm",
        "integrity": "sha256-WbFce6b0OPsBUd7Xr03Kce0iMkpV8ijOXsVCzgDLR0w="
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.wasm",
        "integrity": "sha256-YxvDFtMZrWfakXzc+aFCZVTkSv6I/tOPItx4OM86rXo="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.wasm",
        "integrity": "sha256-Ahiw4HDbGCgX0OiESjw9z+JXw2+uMRBemlzHRtaWZes="
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.wasm",
        "integrity": "sha256-0jmQoALhsiEAsYneNGG+CM70+WO1R/s3jHpGUDisSo0="
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.wasm",
        "integrity": "sha256-lHC4o1ZotnFLPm8FaAJBuPLW0A/GlCXIT0zTz94yBc4="
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.wasm",
        "integrity": "sha256-XcstMVAoLdZ+orRvyskPiuUqRLf5D5lc9kN/NB8aUio="
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.wasm",
        "integrity": "sha256-Tsg7R79augGu7C+8BbYKEU9gLPTRw1kd107Jk8EfUTY="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.wasm",
        "integrity": "sha256-IRJv93qx1UHClw10dYSICCZDR8RKYkHFRj8E+M+ODy4="
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.wasm",
        "integrity": "sha256-Njq6HTh3Pty4dn0WZhYVQUcmg+2rtRPH+qZWYnNb+Pk="
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.wasm",
        "integrity": "sha256-O1aloJDDF5FgI3Rz/S/j1kSVDzwdmyHrldq4/LehmfA="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.wasm",
        "integrity": "sha256-I85V223miQIsEDHwUwJctMPs7r5BH8oklVHTuPILOXE="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.wasm",
        "integrity": "sha256-+F2HpJovT57vb8lhHuHeOu1cweg9oGfXz64WZc6dGho="
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.wasm",
        "integrity": "sha256-EWLyaQVNmvOuGv6OF2zeCD70/btF0kfVKTKsxm6Qor8="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.wasm",
        "integrity": "sha256-7AQsOnr4cz5tEYv3X16GczrqG8krUeDSeFmiYPQLfPk="
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.wasm",
        "integrity": "sha256-bK8dOOh8VCY0QD5N9QgI8XoGFWZl2vam6NEj/2mrjbg="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.wasm",
        "integrity": "sha256-28tbhhHcpHXCupvK0u/qF9goapqSbSOXpI6Bhsb8CUM="
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.wasm",
        "integrity": "sha256-Io8HC44Y/4l1xWpEaPyQ7Fye/nkI+GBp/4T9Le8U4Fw="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.wasm",
        "integrity": "sha256-WC878pTuewOvlqU8PxzU3tyBTpdXJuQmfQ+RLYBQ82U="
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.wasm",
        "integrity": "sha256-scgB56no4jmGIaqIMm3vIz4NoEAXmRIVNvYn/XJyAas="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.wasm",
        "integrity": "sha256-9SZLLpYsSt4DkfJO17U6fih52y9SOuozi6DuztdHE+I="
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.wasm",
        "integrity": "sha256-DP5uISPLoKdOpnsShfhy6uzDlHvBhbugGr+pAs4U7qQ="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.wasm",
        "integrity": "sha256-GGjDW9aFMzTzvF8/A8WmjVr0FaSbwCN2oUuqHMsfq+w="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.wasm",
        "integrity": "sha256-3PRbxdi2Y1NePqRr1fPhl9fEyT5ZD25yjfGVselGX8I="
      },
      {
        "virtualPath": "sdv-plugin.wasm",
        "name": "sdv-plugin.wasm",
        "integrity": "sha256-bqlkQ42k2Mwba9ihsofRUb3XmQIUD6NkbtahO4t2cHM="
      }
    ],
    "pdb": [
      {
        "virtualPath": "sdv-plugin.pdb",
        "name": "sdv-plugin.pdb",
        "integrity": "sha256-ZGP0mbf8LyL5p3WZFv19Xpg7K3Wcm3dMI3vVP8tIhaw="
      }
    ]
  },
  "debugLevel": -1,
  "globalizationMode": "sharded",
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Debugger.IsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": false,
        "System.Threading.Thread.EnableAutoreleasePool": false
      }
    }
  }
}/*json-end*/;