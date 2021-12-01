# action-json-validator

This will validate a json file against a json schema file.

# What's new

- TBD

## Inputs

## `schema`
**Required** The Schema file to run the validate against.
## `config`
**Required** The Config file to run the validate against.

# Usage

See [example/wf.yml](example/wf.yml)

### Sample

```yaml
steps:
- uses: actions/checkout@v2


- uses: pmckl/action-json-validator@main
  with:
    schema: path/to/schema_file.json
    config: path/to/config_file.json
```
