# seedfinder tool that runs in the browser using wasm!

core tech idea from this [article](https://medium.com/@nbelyh/using-net-as-a-webassembly-from-javascript-react-16fd9373c411) and [repo](https://github.com/nbelyh/article-demo-dotnet-react-app/blob/main/README.md)

## .NET WASM Runtime

- Build Debug runtime artifacts and stage them for Vite:
	- `npm run dotnet:debug`
- Build Release runtime artifacts and stage them for Vite:
	- `npm run dotnet:release`

Both commands copy `_framework` output from `sdv-plugin/bin/<Configuration>/net10.0/browser-wasm/AppBundle` into `public/dotnet-runtime`, which is served at `/dotnet-runtime`.

## GitHub Pages + WASM Threads

GitHub Pages cannot set `Cross-Origin-Opener-Policy` and `Cross-Origin-Embedder-Policy` headers directly(?). Recommendation was to use a service worker to apply the cross-origin isolation headers [https://github.com/gzuidhof/coi-serviceworker](https://github.com/gzuidhof/coi-serviceworker).
