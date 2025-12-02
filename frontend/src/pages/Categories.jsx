import { useState, useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import Spinner from "../components/Spinner";
import categoryApi from "../api/categoryApi";
import useHttp from "../hooks/useHttp";
import Message from "../components/Message";

function Categories() {
    const [categories, setCategories] = useState([])
    const { message, loading, send, isError } = useHttp()

    const loadData = () => {
        send({ func: categoryApi.getCategories }).then(result => {
            if (result.ok) {
                setCategories(result.data)
            }
        });
    }

    useEffect(() => {
        loadData();
    }, [])

    if (loading) {
        return <Spinner />
    }
    return (
        <div>
            <Message message={message} isError={isError} />
            {
                categories.map(cat => <CategoryItem key={cat.categoryId} category={cat} />)
            }
        </div>
    )
}

export default Categories;