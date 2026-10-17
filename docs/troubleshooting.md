# Troubleshooting

Start by checking `aptscout --version`, `aptscout properties`, and the database path in use.

## No listings

Run `aptscout scrape --property desert-club`, then `aptscout list` without filters. A fresh database is empty until a successful scrape. If you use `--db`, pass that same path to each command.

## A scrape fails

Check your connection and open the property website directly. HTTP fetching retries transient failures, but a parser cannot recover from an unsupported site redesign. Preserve the error message when [reporting an issue](https://github.com/smeltery/aptscout/issues); omit private filesystem paths or credentials.

Existing stored data remains useful while a source is unavailable. A scrape error should not be interpreted as zero apartments.

## A unit has no history

Check the unit number and `--property`. History starts when aptscout first sees a unit, and later entries reflect changed prices. An unchanged price does not generate another entry on every scrape.

## The browser does not open

Read the URL printed by `aptscout serve` and open it manually. An occupied port causes a fallback. To request another port:

```sh
aptscout serve --port 9000
```

## Database problems

Confirm the parent directory is writable and that you have free disk space. Stop other aptscout processes if a database is locked. Back up the database before cleanup or repair; do not delete it as a first troubleshooting step.

To inspect an isolated fresh database without affecting your history:

```sh
aptscout --db /tmp/aptscout-check.db stats
```
