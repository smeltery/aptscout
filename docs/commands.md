# Command reference

All commands support `--help`. Use `--db PATH` to select a database and `--property ID` for commands that support property scoping.

## Scrape and properties

```sh
aptscout properties
aptscout scrape
aptscout scrape --property desert-club
```

`properties` lists registered providers. `scrape` fetches current listings; it does not schedule future runs. Unknown provider IDs fail with an error.

## List and filter

```sh
aptscout list --beds 2 --baths 2 --max-price 2500
aptscout list --min-price 1500 --available-by 2027-01-01
aptscout list --plan B1 --renovated --sort sqft
aptscout list --json > apartments.json
```

| Flag                         | Meaning                                      |
| ---------------------------- | -------------------------------------------- |
| `--beds`, `--baths`          | Exact bedroom or bathroom count              |
| `--min-price`, `--max-price` | Monthly rent bounds                          |
| `--plan`                     | Exact floor plan code                        |
| `--renovated`                | Renovated units only                         |
| `--available-by`             | Latest availability date, YYYY-MM-DD         |
| `--sort`                     | `price` (default), `date`, `sqft`, or `unit` |
| `--json`                     | Structured output for scripts                |

Filters combine. Listing commands read stored data; run a scrape first to refresh it.

## History and statistics

```sh
aptscout history 2146 --property desert-club
aptscout stats --property desert-club
```

Use `--property` with history to disambiguate identical unit numbers. Without it, history uses the first matching registered property. Statistics report available units, bedroom groups, and scrape timing.

## Local browser

```sh
aptscout serve --port 9000 --open
```

The default port is 8700. An occupied port falls back to an available one. See [Web UI](web-ui.md) for controls and network behavior.

## Cleanup

```sh
aptscout clean --days 30 --dry-run
aptscout clean --days 30
```

Cleanup deletes units not seen for the specified number of days (default 30). **It applies to the whole database**, even if `--property` is supplied. Dry-run prints the age threshold; it does not enumerate affected units. Back up before deleting data.
