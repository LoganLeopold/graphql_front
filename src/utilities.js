// const Record = require('./Record')

module.exports = {

    RelatedPropObj: class RelatedPropObject {
        constructor(recordData, currentModelData) {
            this.recordData = recordData;
            this.currentModelData = currentModelData
        }
    },

    SimplePropObj: class SimplePropObject {
        constructor(dataType, data, field) {
            this.dataType = dataType;
            this.data = data;
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