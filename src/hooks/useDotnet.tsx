import { useEffect, useState } from "react";

let dotnetExportsPromise: Promise<any> | null = null;

const loadDotnetOnce = async (): Promise<any> => {
  if (dotnetExportsPromise) {
    return dotnetExportsPromise;
  }

  dotnetExportsPromise = (async () => {
    // Import from a full browser URL so Vite doesn't try to resolve static files as source modules.
    const runtimeUrl = new URL(
      "/dotnet-runtime/dotnet.js",
      window.location.origin,
    ).href;

    const module = await import(/* @vite-ignore */ runtimeUrl);

    const { getAssemblyExports, getConfig } = await module.dotnet
      .withDiagnosticTracing(false)
      .create();

    const config = getConfig();
    return getAssemblyExports(config.mainAssemblyName);
  })();

  return dotnetExportsPromise;
};

export const useDotNet = () => {
  const [dotnet, setDotNet] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    loadDotnetOnce()
      .then((exports) => {
        if (!cancelled) {
          setDotNet(exports);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { dotnet, loading };
};
