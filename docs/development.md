# Development

The CLI is Go with a pure-Go SQLite driver. The marketing and documentation site uses Next.js and Bun. Markdown in `docs/` is the source for both GitHub and the website.

## Reproducible environment

Install [Flox](https://flox.dev/docs/install-flox/), then:

```sh
flox activate
bun install --frozen-lockfile
bunx playwright install chromium
pre-commit install
```

Flox locks Go, Bun, Node, golangci-lint, actionlint, shellcheck, and pre-commit for macOS and Linux on Intel and ARM. Activation installs missing JavaScript dependencies and enables hooks locally; CI installs dependencies explicitly. Browser downloads are a separate first-time step. On Linux, use `bunx playwright install --with-deps chromium` to install required system libraries.

## Run and build

```sh
make build
./aptscout --help
bun run docs
bun run --cwd website dev
```

The website runs at `http://localhost:3005`. Generate diagrams before starting development after changing Mermaid blocks. `bun run --cwd website build` generates diagrams and creates a production build; `bun run --cwd website start` previews it.

Set `NEXT_PUBLIC_SITE_URL` to the real public origin when deploying. Without it, robots disallows indexing and the sitemap is empty. Keep Vercel's project root set to `website` with access to files outside the root; the build reads `../docs` and the workspace lockfile.

## Shared verification

```sh
bun run ci
pre-commit run --all-files
```

CI and hooks call the same `scripts/check.sh` groups:

| Group       | Checks                                                                         |
| ----------- | ------------------------------------------------------------------------------ |
| `go`        | gofmt, vet, golangci-lint, race tests, coverage, binary build                  |
| `docs`      | File/directory budgets, local Markdown links, Markdown lint, Mermaid rendering |
| `web`       | Prettier, TypeScript, production build, browser journeys, accessibility        |
| `workflows` | actionlint and shellcheck                                                      |

Go checks run on Linux and macOS. Website and documentation checks run on Linux in CI. Run a single group with `bash scripts/check.sh docs`. Use `bun run format` to format authored web/config/docs files before committing.

## Keep changes small

Source and docs files have a 350-line default budget and directories have a 25-source-file limit. Existing large backend files have explicit, non-growing exceptions in `scripts/budgets.json`; new features should use cohesive modules. Generated lockfiles, assets, and build output are excluded. Do not compress code to evade the limit.

## Releases

Successful push CI on `master` triggers the automatic release workflow. It tags the tested commit with the next patch version, then explicitly dispatches the release build. Pull-request CI cannot create a release. Existing tags are reused without cutting a duplicate.

The release workflow checks the tag and reruns Go verification before GoReleaser publishes macOS and Linux archives for Intel and ARM, plus checksums. Manual version-tag pushes and workflow dispatch are also supported. Releases use the repository token; no external package tap credential is required.

## Documentation and branding

Add a Markdown page to `docs/` and its navigation entry to `website/src/lib/catalog.ts`. Keep links relative in Markdown. Mermaid fences are rendered and validated with the same renderer used for the website. Add route coverage when expanding the site.

The apartment mark is `website/public/logo.svg`. The social image source is `website/public/og-image.svg`; regenerate its PNG with `bun run scripts/social-image.ts`. The README references the same assets.
