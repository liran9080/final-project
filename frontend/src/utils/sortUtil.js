// sort functions
const sortBenefits = (benefits) => {
    benefits.sort((b1, b2) => b1.title.localeCompare(b2.title));
    return benefits;
}
const sortFoundation = (foundations) => {
    foundations.sort((f1, f2) => f1.name.localeCompare(f2.name));
    return foundations;
}

export const generalSort = (arr, field) => {
    const sortFunc = {
        'string': (e1, e2) => e1[field].localeCompare(e2[field]),
        'number': (e1, e2) => e1[field] - e2[field],
    }
    const valueType = typeof(arr[0]?.[field]);
    if(valueType == undefined)return arr
    
    return arr.sort(sortFunc[valueType])

    // if (typef(arr[0][field]) == 'string') {
    //     return arr.sort((e1, e2) => e1[field].localeCompare(e2[field]))
    // } else if (typef(arr[0][field]) == 'number') {
    //     return arr.sort((e1, e2) => e1[field] - e2[field])
    // } else {
    //     return arr;
    // }
}