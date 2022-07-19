const regex = new RegExp('[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]', 'g')
const escapes = { '\u001b': true, '\u009b': true }
const reset = '\u001b[0m'

module.exports = (maxColumns, userOptions = {})=> {
    let columns, wrapped, options, remaining, current

    columns = maxColumns
    options = Object.assign({ first: false, hard: false }, userOptions)

    const normalize = wrapped => {
        for (let i = 0, l = wrapped.length; i < l; i++) {
            wrapped[i] = wrapped[i].trimEnd()

            const matches = wrapped[i].match(regex)

            if (matches !== null) {
                const match = matches[matches.length - 1]

                if (match !== reset) {
                    const j = i + 1

                    if (wrapped[j] !== undefined) {
                        wrapped[j] = match + wrapped[j]
                    }

                    wrapped[i] += reset
                }
            }
        }

        return wrapped
    }

    const wrap = words => {
        for (let i = 0, l = words.length; i < l; i++) {
            const word = words[i]
            const wl = strip(word).length

            if (wl <= remaining) {
                remaining -= wl
                wrapped[current] += word

                if (remaining > 0) {
                    remaining--
                    wrapped[current] += ' '
                }

                continue
            }

            if (options.first === true) {
                break
            }

            if (wl > columns || options.hard === true) {
                wordwrap(word)

                continue
            }

            next()
        }
    }

    const wordwrap = word => {
        let inside = false

        for (let i = 0, l = word.length; i < l; i++) {
            const chr = word[i]

            if (escapes[chr] === true) {
                inside = true
            }

            if (inside === false) {
                if (remaining === 0) {
                    next()
                }

                remaining--
            }

            wrapped[current] += chr

            if (inside === true && chr === 'm') {
                inside = false
            }
        }

        if (remaining > 0) {
            remaining--
            wrapped[current] += ' '
        }
    }

    const next = ()=> {
        wrapped.push('')
        current++
        remaining = columns
    }

    const strip = str => str.replace(regex, '')

    return str => {
        if (str.length <= columns || strip(str).length <= columns) {
            return [str]
        }

        wrapped = ['']
        current = 0
        remaining = columns

        wrap(str.split(' '))

        return normalize(wrapped)
    }
}
