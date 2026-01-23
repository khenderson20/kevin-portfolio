# GitHub Proxy Function (Server-side)

This Amplify Gen2 function proxies GitHub requests so the GitHub token is **never** shipped to the browser.

## Secrets / env vars

- `GITHUB_TOKEN` **(secret)**: GitHub Personal Access Token (classic). Prefer minimal scopes.
- `GITHUB_USERNAME` **(optional)**: defaults to `khenderson20`.

## Routes (expected)

The handler supports:

- `GET /github/user`
- `GET /github/repos`
- `GET /github/repos/:repo/languages`
- `GET /github/events`

How these routes are exposed (API Gateway / Function URL) depends on your Amplify hosting/backend wiring.

