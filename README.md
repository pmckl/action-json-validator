# action-json-validator

This will validate a json file against a json schema file.

# What's new

- TBD

# Usage

See [sample/wf.yml](sample/wf.yml)

### Usage

```yaml
steps:
- uses: actions/checkout@v2


- uses: pmckl/action-json-validator@main
  with:
    schema: path/to/schema_file.json
    config: path/to/config_file.json
```
