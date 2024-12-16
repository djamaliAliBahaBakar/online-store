import { useState } from "react";
import Button from "./Button.jsx";
import Input from "./Input" 
import {loadStripe} from "@stripe/stripe-js";

export default function Cart({ cart }) {
  const [email, setEmail] = useState("")
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const stripeLoadedPromise = loadStripe('pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate');
  const lineItems = cart.map(item=>{
    return {price: item.price_id, quantity: item.quantity}
  })
  function handleFormSubmit(event) {
    event.preventDefault();
        stripeLoadedPromise.then(stripe => {
      stripe.redirectToCheckout({
        lineItems: lineItems,
        mode: 'payment',
        successUrl: 'https://react-tutorial.app/app.html',
        cancelUrl: 'https://react-tutorial.app/app.html',
        customerEmail: email
      }).then(response => {
        // this will only log if the redirect did not work
        console.log(response.error);
      }).catch(error => {
        // wrong API key? you will see the error message here
        console.log(error);
      });
    });
  }

  return (
    <div className="cart-layout">
      <div>
        <h1>Your Cart</h1>
        {cart.length === 0 && (
          <p>You have not added any product to your cart yet.</p>
        )}
        {cart.length > 0 && (
          <>
            <table className="table table-cart">
              <thead>
                <tr>
                  <th width="25%" className="th-product">
                    Product
                  </th>
                  <th width="20%">Unit price</th>
                  <th width="10%">Quantity</th>
                  <th width="25%">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          width="30"
                          height="30"
                          alt=""
                        />{" "}
                        {product.name}
                      </td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <strong>${product.price * product.quantity}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="2"></th>
                  <th className="cart-highlight">Total</th>
                  <th className="cart-highlight">${totalPrice}</th>
                </tr>
              </tfoot>
            </table>
            {cart.length > 0 && <form class="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
              </p>
              <Input autocomplete="email" value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Email" type="email" required />
              <Button type="submit">Pay</Button>
            </form>}

          </>
        )}
      </div>
    </div>
  );
}