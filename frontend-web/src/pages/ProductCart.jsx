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
      <h2 className="mb-4">Product Cart</h2>
      <table className="table table-hover text-center">
        <thead className="table-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Product Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartData.length > 0 ? (
            cartData.map((item, index) => (
              <tr key={index} className="">
                <td>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{item.productName}</td>
                <td>{item.productPrice}</td>
                <td>
                  <i
                    className="bi bi-dash-square-fill"
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      marginRight: "10px",
                    }}
                    onClick={() => decrementQuantity(item._id)}
                  ></i>
                  {item.count}
                  <i
                    className="bi bi-plus-square-fill"
                    style={{
                      cursor: "pointer",
                      fontSize: "24px",
                      marginLeft: "10px",
                    }}
                    onClick={() => incrementQuantity(item._id)}
                  ></i>
                </td>
                <td>
                  <i
                    className="bi bi-trash"
                    style={{
                      cursor: "pointer",
                      color: "red",
                      fontSize: "24px",
                    }}
                    onClick={() => removeProductFromCart(item._id)}
                  ></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                <h3 className="text-danger">Your cart is empty!</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-end align-items-center mt-4">
        <h4 className="me-4">Total Amount: {totalAmount.toFixed(2)}</h4>
        <button
          className="btn btn-success"
          onClick={() => proceedToCheckout(totalAmount)}
        >
          Proceed to checkout
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductCart;
