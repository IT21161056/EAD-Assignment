import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCartContext } from "../components/providers/ContextProvider";

const ProductCart = () => {
  const { cartData, setCartData } = useCartContext();
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  const incrementQuantity = (productId) => {
    const updatedQuantity = cartData.map((item) =>
      item._id === productId ? { ...item, count: item.count + 1 } : item
    );
    setCartData(updatedQuantity);
    localStorage.setItem("localCartData", JSON.stringify(updatedQuantity));
  };

  const decrementQuantity = (productId) => {
    const updatedQuantity = cartData.map((item) =>
      item._id === productId && item.count > 1
        ? { ...item, count: item.count - 1 }
        : item
    );
    setCartData(updatedQuantity);
    localStorage.setItem("localCartData", JSON.stringify(updatedQuantity));
  };

  // accumulator -> the running total
  const calculateTotalAmount = () => {
    const calculatedAmount = cartData.reduce(
      (accumulator, item) => accumulator + item.productPrice * item.count,
      0
    );
    setTotalAmount(calculatedAmount);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [cartData]);

  const removeProductFromCart = (productId) => {
    const updatedCart = cartData.filter((item) => item._id !== productId);
    setCartData(updatedCart);
    localStorage.setItem("localCartData", JSON.stringify(updatedCart));

    toast.success("Product removed!", {
      autoClose: 200,
      position: "top-right",
    });
  };

  const proceedToCheckout = (totAmount) => {
    navigate(`/order/?total=${totAmount}`);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Product Cart</h1>
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <tr key={index}>
                <td>{item.productName}</td>
                <td>{item.productPrice}</td>
                <td>
                  <button onClick={() => decrementQuantity(item._id)}>
                    <i className="bi bi-dash-square-fill"></i>
                  </button>
                  {item.count}
                  <button onClick={() => incrementQuantity(item._id)}>
                    <i className="bi bi-plus-square-fill"></i>
                  </button>
                </td>
                <td>
                  <button onClick={() => removeProductFromCart(item._id)}>
                    <i
                      className="bi bi-trash"
                      style={{ cursor: "pointer", color: "red" }}
                    ></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                <h3>Your cart is empty!</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Total Amount: {totalAmount.toFixed(2)}</h3>
      <button
        className="btn btn-success"
        onClick={() => proceedToCheckout(totalAmount)}
      >
        Proceed to checkout
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProductCart;
