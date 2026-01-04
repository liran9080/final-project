import { useState, useCallback } from 'react'
// import useHttp from './useHttp';

const useEdit = (send) => {
    const [itemId, setItemId] = useState(-1);

    const editItem = useCallback((itemId) => {
        console.log(itemId);

        setItemId(itemId)
    }, [])
    const closeEditItem = useCallback(() => {
        setItemId(-1)
    }, [])

    const deleteItem = useCallback((itemId, apiFunc, postDeleteFunc) => {  
        if(!send) return;
        send({ func: apiFunc, id: itemId }).then(result => {
            if (result.ok) {
                postDeleteFunc?.(result);
            }
        })
    }, [])

    return {itemId, editItem, closeEditItem, deleteItem}

}

export default useEdit;