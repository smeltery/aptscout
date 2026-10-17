# Properties and providers

Each supported property has a parser that converts its website into common apartment and floor-plan records.

## Supported property

| ID            | Property                        | Source                                                                               |
| ------------- | ------------------------------- | ------------------------------------------------------------------------------------ |
| `desert-club` | Desert Club Apartments, Phoenix | [Weidner](https://arizona.weidner.com/apartments/az/phoenix/desert-club0/floorplans) |

```sh
aptscout properties
aptscout scrape --property desert-club
```

Provider support depends on the source website's markup. A website redesign may require a parser update. Use reasonable scrape intervals and respect the source's terms and access restrictions.

## Add a provider

Implement `models.Provider` in a package under `internal/provider/`, then register it in `internal/provider/registry.go`.

```go
type Provider interface {
    ID() string
    Name() string
    Scrape(ctx context.Context, fetch Fetcher) (*ScrapeData, error)
}
```

Use the supplied fetch function so HTTP handling is consistent. Return normalized records with stable property, unit, and plan identifiers. Return an error for malformed or unexpectedly empty source content rather than treating it as a successful empty inventory.

## Verify parsing

Use representative HTML fixtures and tests for normal inventory, missing fields, changed markup, and failures. Avoid tests that depend on the live property site. Run the shared checks described in [Development](development.md) before opening a pull request.
