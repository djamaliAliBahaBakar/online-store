import Product from "./Product"
export default function ProductsList(props) {

    return (<ul className="store-front">
            {props.products.map(product => <li key={product.id}>
                <Product details={product} />
                <button className="btn-outline btn-delete" onClick={() => props.onDeleteClicked(product.id)}>Delete</button>
            </li>)}
        </ul>);
}