# <img src="website/public/logo.svg" width="40" height="40" alt=""> aptscout

Apartment listings change. Keep the full picture.

![aptscout — Find your place. Keep the full picture.](website/public/og-image.png)

[![CI](https://github.com/smeltery/aptscout/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/aptscout/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/aptscout)](https://github.com/smeltery/aptscout/releases)
[![License](https://img.shields.io/badge/license-PolyForm_Shield-blue)](LICENSE)
![Go](https://img.shields.io/badge/Go-1.26-00ADD8?logo=go&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-local-003B57?logo=sqlite)
![Next.js](https://img.shields.io/badge/Next.js-website-000?logo=nextdotjs)
![Bun](https://img.shields.io/badge/Bun-tooling-14151a?logo=bun)
[![Flox](https://img.shields.io/badge/Flox-dev_environment-7b59e8)](.flox/env/manifest.toml)
![Platforms](https://img.shields.io/badge/platforms-macOS_%7C_Linux-555)

Collect apartment availability, filter by budget and bedrooms, and track rent changes in a local SQLite database. Use the Go CLI or its embedded browser UI. No account required. The included provider supports **Desert Club Apartments in Phoenix**; additional properties can be added through providers.

## Get started

Install a [release binary](https://github.com/smeltery/aptscout/releases), or use Go 1.26.1+:

```sh
go install github.com/smeltery/aptscout@latest
aptscout scrape
aptscout list --beds 2 --max-price 2500
aptscout serve --open
```

## Documentation

Start in [docs/](docs/README.md): [installation](docs/quick-start.md), [commands](docs/commands.md), [web UI](docs/web-ui.md), [data and history](docs/data.md), [providers](docs/providers.md), and [troubleshooting](docs/troubleshooting.md).

For development, activate [Flox](https://flox.dev), then run `bun run ci`. See [development](docs/development.md) for setup, pre-commit hooks, website commands, and automatic releases.

Licensed under [PolyForm Shield 1.0.0](LICENSE).
