// const Record = require('./Record')

module.exports = {

    PropObj: class PropObject {
        constructor(display, nested, top, field) {
            this.display = display;
            this.nested = nested;
            this.top = top;
            this.field = field
        }
    },

    capitalize: (word, charAt, slice) => word.charAt(charAt).toUpperCase() + word.slice(slice),

    pluralize: word => word += 's',

    depluralize: word => {

        let arr = word.split('')
        arr.splice(arr.length - 1, 1)
        return arr.join('')

    },

}