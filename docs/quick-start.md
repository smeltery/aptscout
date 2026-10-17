# Quick start

Install aptscout, collect listings, and browse your local results.

## Install

Download an archive for macOS or Linux, on Intel or ARM, from [GitHub Releases](https://github.com/smeltery/aptscout/releases). Extract it and put the `aptscout` binary on your PATH. Release archives include a checksums file.

With Go 1.26.1 or newer:

```sh
go install github.com/smeltery/aptscout@latest
aptscout --version
```

If the command is missing, add Go's binary directory (normally `$HOME/go/bin`) to your PATH. For an unreleased checkout, see [Development](development.md).

## Collect listings

```sh
aptscout properties
aptscout scrape --property desert-club
```

An internet connection is needed to scrape. Run `aptscout scrape` without a property to run every registered provider. The database and its parent directory are created automatically.

## Find a unit

```sh
aptscout list --beds 2 --max-price 2500
aptscout list --property desert-club --sort price
aptscout stats
aptscout serve --open
```

The browser normally opens at `http://localhost:8700`. Read the terminal output for the actual port. Listings in documentation and site illustrations are examples, not current inventory.

## Come back later

```sh
aptscout scrape
aptscout history 2146 --property desert-club
```

History begins with your first observation. Scraping again adds a history entry when a unit's price changes. Continue with the [command reference](commands.md).
