import { useState, useCallback } from 'react'
import useHttp from './useHttp';

const useEdit = (send) => {
    const [itemId, setItemId] = useState(-1);

    const editItem = useCallback((commentId) => {
        console.log(commentId);

        setItemId(commentId)
    }, [])
    const closeEditItem = useCallback(() => {
        setItemId(-1)
    }, [])

    const deleteItem = useCallback((itemId, apiFunc, postDeleteFunc) => {        
        send({ func: apiFunc, id: itemId }).then(result => {
            if (result.ok) {
                postDeleteFunc?.();
            }
        })
    }, [])

    return {itemId, editItem, closeEditItem, deleteItem}

}

export default useEdit;