import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

const ProductCart = () => {
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (localStorage.cartLocalData) {
        const localCartData = JSON.parse(localStorage.getItem("cartLocalData"));
        setCartData(localCartData);
      }
    } catch (error) {
      console.log("Error fetching cart data", error);
    }
  }, [setCartData]);

  const incrementQuantity = (productId) => {
    const updatedQuantity = cartData.map((item) => {
      item._id === productId ? { ...item, productQuantity: item + 1 } : item;
    });
    setCartData(updatedQuantity);
    localStorage.setItem("cartLocalData", JSON.stringify(updatedQuantity));
  };

  const decrementQuantity = (productId) => {
    const updatedQuantity = cartData.map((item) => {
      item._id === productId ? { ...item, productQuantity: item - 1 } : item;
    });
    setCartData(updatedQuantity);
    localStorage.setItem("cartLocalData", JSON.stringify(updatedQuantity));
  };

  // accumulator -> the running total
  useEffect(() => {
    const calculateTotalAmount = () => {
      try {
        const calculatedAmount = cartData.reduce(
          (accumulator, item) =>
            accumulator + item.productPrice * item.productQuantity,
          0
        );
        setTotalAmount(calculatedAmount);
      } catch (error) {
        console.log("Error calculating the total amount", error);
      }
    };
    calculateTotalAmount();
  }, [cartData]);

  const removeProductFromCart = (productId) => {
    const updatedCart = cartData.filter((item) => {
      item._id !== productId;
    });
    setCartData(updatedCart);
    localStorage.setItem("cartLocalData", JSON.stringify(updatedCart));

    toast.success("Product removed!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
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
            <th scope="col">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {cartData.map((item, index) => {
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.productPrice}</td>
              <td>
                <button onClick={() => decrementQuantity(item._id)}>
                  <i class="bi bi-dash-square-fill"></i>
                </button>
                {item.quantity}
                <button onClick={() => incrementQuantity(item._id)}>
                  <i className="bi bi-plus-square-fill"></i>
                </button>
              </td>
              <td>
                <i
                  className="bi bi-trash"
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => removeProductFromCart(item._id)}
                ></i>
              </td>
            </tr>;
          })}
        </tbody>
        <ToastContainer />
      </table>
      <h3>Total Amount: {totalAmount.toFixed(2)}</h3>
      <button
        className="btn btn-success"
        onClick={() => proceedToCheckout(totalAmount)}
      >
        Proceed to checkout
      </button>
    </div>
  );
};

export default ProductCart;
