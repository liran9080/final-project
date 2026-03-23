export const  isoDateToDisplay = (isodate) =>{
// 2026-03-20T11:35:56.262Z
    const date = new Date(isodate)
    return date.toLocaleString()
}