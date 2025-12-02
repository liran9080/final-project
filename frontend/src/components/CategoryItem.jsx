import { Link } from "react-router-dom";
function CategoryItem({category}){
    //const {category} = props;
    return(
        <div>
            <h3><Link to={'/categories/' + category.categoryId}> {category.name}</Link></h3>
         
        </div>
    )
}

export default CategoryItem;