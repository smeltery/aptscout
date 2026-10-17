#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
case "${1:-all}" in
  go)
    unformatted="$(gofmt -l cmd internal main.go)"
    if [ -n "$unformatted" ]; then echo "Run gofmt on:"; echo "$unformatted"; exit 1; fi
    go vet ./...
    golangci-lint run
    go test -race -coverprofile=coverage.out ./...
    go build -o /tmp/aptscout-check .
    ;;
  docs)
    bun run check
    bunx --no-install markdownlint-cli2
    bun run docs
    ;;
  web)
    bun run format:check
    bun run --cwd website typecheck
    bun run --cwd website build
    bun run test:web
    ;;
  workflows)
    actionlint
    shellcheck scripts/*.sh
    ;;
  all)
    for check in go docs web workflows; do bash scripts/check.sh "$check"; done
    ;;
  *) echo "Unknown check: $1" >&2; exit 2 ;;
esac
