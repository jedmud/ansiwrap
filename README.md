# AnsiWrap

Fast single line wordwrap for colored strings with ANSI escape codes.

## Install

npm i @jedmud/ansiwrap

## Usage

```javascript
const ansiwrap = require('@jedmud/ansiwrap')

const columns = 50
const options = { hard: false, first: false }

const wrap = ansiwrap(columns, options)

const res = wrap(<String with colored ansi escape codes>)
```

## Options

**hard**

- Type: boolean
- Default: false

If set to true, words will be broken to match column size exactly.

**first**

- Type: boolean
- Default: false

If set to true, returns only the first line.
