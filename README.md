# action-json-validator

This action can be used to validate a json file against a json schema definition.

# What's new

- PR Comment(s)
  If the action used in a pull-request, then it can create a comment and update the exact same comment with the found problem(s) in the json file.

## Inputs

### `schema`
**Required** The JSON schema definition file.

### `config`
**Required** The JSON configuration file.

### `github_token`
**Optional** Github token to create / update pull-request comments.

### `pull_request_comment`
**Optional** Feature flag to create a pull-request comment.

# Usage

### Simple

```yaml
---
name: pull-request-json-validator
on:
  pull_request:
jobs:
  run-validator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pmckl/action-json-validator@refactor
        name: Validator
        with:
          schema: json-validator/schema.json
          config: json-validator/config.json
```

### Advanced

```yaml
---
name: pull-request-json-validator
on:
  pull_request:
jobs:
  run-validator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pmckl/action-json-validator@refactor
        name: Validator
        with:
          schema: json-validator/schema.json
          config: json-validator/invalid-config.json
          github_token: ${{ secrets.GITHUB_TOKEN }}
          pull_request_comment: true
```
