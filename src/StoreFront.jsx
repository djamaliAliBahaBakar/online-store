import {useState} from "react";
import ProductsList from "./ProductsList";
import AddProductForm from "./AddProductForm";

export default function StoreFront() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [validation, setValidation] = useState("");

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!name) {
            setValidation("Please enter a name");
            return ;
        }
        if (!description){
            setValidation("Please enter a description");
            return ;
        }
        setProducts([...products, {
            id: products.length + 1,
            name: name,
            description: description
        }]);
        setName("");
        setDescription("");
        setValidation("");
    }

    function handleDeleteClick(id) {
        setProducts(products.filter(product => product.id !== id));
    }

    function handleNameChanged(e) {
        setName(e.target.value)
    }

    function handleDecriptionChanged(e) {
        setDescription(e.target.value)
    }

    function handleValidationChanged(e) {
        setValidation(e.target.value)
    }

    return (
        <>
        <AddProductForm onFormSubmit={handleFormSubmit} name={name} description={description} validation={validation} onNameChanged={handleNameChanged}  onDescriptionChanged={handleDecriptionChanged}/>
        <ProductsList products={products} onDeleteClicked={handleDeleteClick}/>
        
    </>
    )
}