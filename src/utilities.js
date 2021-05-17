import RelatedRecord from "./records/RelatedRecord"

let RelatedPropObj = class RelatedPropObject {
    constructor(recordData, currentModelData) {
        this.recordData = recordData; // Record instance data (whole nested document object from current doc state)
        this.currentModelData = currentModelData; // Entire state object of current document)
    } 
}

let SimplePropObj = class SimplePropObject {
    constructor(recordData, currentModelData) {
        this.recordData = recordData; // key: value object for record
        this.currentModelData = currentModelData; // Entire state object of current document
    }
}

let capitalize = (word, charAt, slice) => word.charAt(charAt).toUpperCase() + word.slice(slice)

let depluralize = word => {

    let arr = word.split('')
    arr.splice(arr.length - 1, 1)
    return arr.join('')

}

let pluralize = word => word += 's'

let returnRelatedRecords = (recordsArray, stateObject, propsArray) => {

    let records = recordsArray.map( (record, i) => {

        let relatedRecordProps = new RelatedPropObj(record, stateObject)
        
        let props = propsArray ? 
        // an object established by the methodsArray
        propsArray.reduce( (acc, curr) => {
            acc[`${curr[0]}`] = curr[1]
            return acc
        }, {}) 
        // or an object for just the key and props class to be added to
        : {}

        props['key'] = i
        props['propObj'] = relatedRecordProps 

        return <RelatedRecord {...props}/> 
    })

    return records

}

export { 
    RelatedPropObj, 
    SimplePropObj, 
    capitalize, 
    depluralize, 
    pluralize, 
    returnRelatedRecords 
}

