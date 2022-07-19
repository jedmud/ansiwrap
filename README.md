# AnsiWrap

Fast single line wordwrap for strings with ANSI escape codes.

## Install

npm i @jedmud/ansiwrap

## Usage

AnsiWrap accepts a string without newline and carriage return characters. If your string has any, you need to split/clean the string before passing it to AnsiWrap.

```javascript
const ansiwrap = require('@jedmud/ansiwrap')

const columns = 50
const options = { hard: false, first: false }

const wrap = ansiwrap(columns, options)

const res = wrap(<A string with ANSI escape codes>)
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
