export default function AddProductForm(props) {

    return (
         <form onSubmit={props.onFormSubmit}>
        <div>
            <label htmlFor="product-name">Name:</label>
            <input type="text" value={props.name} onChange={props.onNameChanged} id="product-name" placeholder="Enter the name" className="textfield" />
            </div>
            <div>
            <label htmlFor="product-description">Description:</label>
            <input type="text" value={props.description} onChange={props.onDescriptionChanged} id="product-description" placeholder="Enter the description" className="textfield" />
            </div>
            <div className="form-footer">
            <div className="validation-message">{props.validation}</div>
            <input type="submit" className="btn btn-primary" value="Add product" />
            </div>
        </form>
    );
}