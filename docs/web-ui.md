# Local web UI

Browse the same SQLite data as the CLI, using assets embedded in the executable.

## Open the browser

```sh
aptscout serve --open
```

The default address is `http://localhost:8700`. If that port is busy, the terminal prints the selected fallback port. Stop the server with Ctrl+C. Go and Bun are not needed to run a downloaded binary.

The server currently listens on all network interfaces and has no authentication. Use it on a trusted network; do not expose the port publicly. The marketing website does not host your database or run scrapes.

## Browse and compare

Choose a property, then filter its apartments by bedrooms, bathrooms, price, dates, floor plan, or renovation status. Open a unit for details and a price history chart. Follow its property link to verify availability at the source.

Re-scrape from the browser to refresh your saved data. If no units match, clear filters or widen your budget and dates before scraping again.

## Keyboard controls

| Shortcut        | Action                                   |
| --------------- | ---------------------------------------- |
| `⌘K` / `Ctrl+K` | Open the command palette                 |
| `/`             | Focus filters                            |
| `r`             | Request a scrape                         |
| `Escape`        | Dismiss or clear the current interaction |

## Keep your context

```sh
aptscout --db /path/to/search.db scrape
aptscout --db /path/to/search.db serve --open
```

Use the same database path for collecting and browsing. Separate paths create independent histories. Read [Data and history](data.md) before moving or backing up a database.
