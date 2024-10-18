import {useEffect, useState} from "react";
import Product from "./Product";
import Loader from './Loader'

export default function StoreFront() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setIsLoading(true)
        fetch("https://react-tutorial-demo.firebaseio.com/products.json").then(response=>response.json()).then(data=>{
            console.log(data);
            if (data) {
                setProducts(data)
            }
    }).catch(error=>{
        console.log(error)
    }).finally(()=>{
        setIsLoading(false)
    })
    }, [])
    return <div className="store-front">
        {isLoading && <Loader />}
        {products && products.map(product=>{
            return <Product key={product.id} details={product}/>
        })}
    </div>;
}
