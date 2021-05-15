import RelatedRecord from "./records/RelatedRecord"

let RelatedPropObj = class RelatedPropObject {
    constructor(recordData, currentModelData) {
        this.recordData = recordData;
        this.currentModelData = currentModelData
    }
}

let SimplePropObj = class SimplePropObject {
    constructor(dataType, data, field) {
        this.dataType = dataType;
        this.data = data;
        this.field = field
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

        let props = propsArray.reduce( (acc, curr) => {

            acc[`${curr[0]}`] = curr[1]

            return acc

        }, {})

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

