import RelatedRecord from "./records/RelatedRecord"

let NewPropObj = class NewPropObject {
    constructor(subDoc, currentDocData) {
        this.subDoc = subDoc; // 
        this.currentDocData = currentDocData;
    }
}

// Prop object for subdocument of a current document - returned by this.returnRelatedRecords
let RelatedPropObj = class RelatedPropObject {
    constructor(subDoc, currentDocData) {
        this.subDoc = subDoc; // Subdocument instance for data in current record component (comes from current doc state)
        this.currentDocData = currentDocData; // Entire state object of current document
    } 
}

// Sending the simple data and the data object of the entire current document to the rendering element
let SimplePropObj = class SimplePropObject {
    constructor(subDoc, currentDocData) {
        this.subDoc = subDoc; // key: value object for field
        this.currentDocData = currentDocData; // Entire state object of current document
    }
}

// Word you want to capitalize, the index at which you want to capitalize the letter, and the index at which you start the word that will go after the capitalized letter
let capitalize = (word, charAt, slice) => {
    return word.charAt(charAt).toUpperCase() + word.slice(slice)
}

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
    NewPropObj,
    RelatedPropObj, 
    SimplePropObj, 
    capitalize, 
    depluralize, 
    pluralize, 
    returnRelatedRecords 
}

