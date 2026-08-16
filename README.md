# iogii arena

A browser-only practice judge for the [iogii programming language](https://golfscript.com/iogii/), hosted on GitHub Pages.

## Features

- Official iogii 1.2.1 Ruby/WebAssembly interpreter
- Five built-in practice problems
- Custom input runner and multi-case judging
- Per-problem solution and progress persistence in `localStorage`
- Responsive, accessible interface with no backend

## Architecture

`index.html` contains the judge interface. `runtime.html` is the official iogii browser interpreter, isolated in a same-origin iframe. The judge writes programs and inputs into that runtime and reads the resulting output. Third-party browser assets use immutable, version-pinned CDN URLs with integrity verification.

Because this is a static site, test cases shipped in `assets/js/app.js` are discoverable and should be treated as educational checks rather than secure competitive-programming tests.

## Local preview

Serve the repository over HTTP; WebAssembly will not load reliably from a `file://` URL.

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

## Credits and licensing

The iogii interpreter is copyright 2024–2026 Darren Smith and redistributed under its BSD 3-Clause license. See `LICENSE.txt` and `THIRD_PARTY_NOTICES.md` for interpreter and runtime notices. This site is an independent practice interface and is not endorsed by the iogii author.
