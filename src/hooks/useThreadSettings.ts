import { useEffect, useState } from "react";

export type ThreadSettings = {
  maxRequestableWorkers: number;
  defaultWorkers: number;
};

export function useThreadSettings(dotnet: any) {
  const [threadSettings, setThreadSettings] = useState<ThreadSettings | null>(
    null,
  );

  useEffect(() => {
    if (!dotnet) {
      return;
    }

    const loadThreadSettings = async () => {
      try {
        const result =
          (await dotnet.SeedFinding.SearchFunctions.GetThreadSettings()) as string;
        const parsed = JSON.parse(result) as ThreadSettings;
        setThreadSettings(parsed);
      } catch {
        setThreadSettings(null);
      }
    };

    void loadThreadSettings();
  }, [dotnet]);

  return threadSettings;
}
