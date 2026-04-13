import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const configuration = process.argv[2] ?? "Debug";
const validConfigurations = new Set(["Debug", "Release"]);

if (!validConfigurations.has(configuration)) {
  console.error(
    `Invalid configuration '${configuration}'. Use Debug or Release.`,
  );
  process.exit(1);
}

const repoRoot = resolve(import.meta.dirname, "..");
const projectPath = resolve(repoRoot, "sdv-plugin", "sdv-plugin.csproj");

const build = spawnSync(
  "dotnet",
  ["build", projectPath, "-c", configuration, "-r", "browser-wasm"],
  {
    cwd: repoRoot,
    stdio: "inherit",
  },
);

if (build.status !== 0) {
  process.exit(build.status ?? 1);
}

const frameworkSource = resolve(
  repoRoot,
  "sdv-plugin",
  "bin",
  configuration,
  "net10.0",
  "browser-wasm",
  "AppBundle",
  "_framework",
);

const runtimeTarget = resolve(repoRoot, "public", "dotnet-runtime");

if (!existsSync(frameworkSource)) {
  console.error(`Expected runtime output not found: ${frameworkSource}`);
  process.exit(1);
}

mkdirSync(runtimeTarget, { recursive: true });
rmSync(runtimeTarget, { recursive: true, force: true });
cpSync(frameworkSource, runtimeTarget, { recursive: true });

console.log(
  `Staged .NET runtime (${configuration}) to public/dotnet-runtime`,
);
