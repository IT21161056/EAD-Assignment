import {useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import APIService from '../../APIService/APIService';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import {useCartContext} from "../components/providers/ContextProvider"

const PlaceOrder = ({ show, handleClose, totalAmount }) => {
    const [validated, setValidated] = useState(false);
    const [userName, setName] = useState("")
    const [shippingAddress, setShippingAddress] = useState("")
    const [mobileNumber, setMobile] = useState("")
    const [status, setStatus] = useState("Pending")
    const [userId, setUserId] = useState("65074c59a3e8fa0c12345679")

    const { setCartData } = useCartContext()

    const navigate = useNavigate()
    const orderDetails = JSON.parse(localStorage.getItem("localCartData"));

    const handleFormData = () => {
        const orderObj = {
            userId,
            userName,
            shippingAddress,
            mobileNumber,
            status,
            totalAmount: parseFloat(totalAmount),
            orderItems: orderDetails
        }
        return orderObj
    }

    const handleSubmit = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            const orderObj = handleFormData()
            setValidated(true);
            try {
                const response = await APIService.purchaseOrder(orderObj)
                console.log(response)
                if (response.status == 201) {
                    toast.success("Order Purchased Successfully!", {
                        autoClose: 250,
                        position: "top-right",
                    });
                }
                setTimeout((() => {
                    navigate('/orders')
                    localStorage.removeItem("localCartData")
                }), 1500)
                handleClose()
            } catch (err) {
                console.error('Error placing order', err)
                toast.error("Error Purchasing Order!", {
                    autoClose: 250,
                    position: "top-right",
                });
            }
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter Order details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Total Amount Rs.</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                placeholder="Order Total"
                                readOnly
                                value={totalAmount}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter name"
                                autoFocus
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a name.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Shipping address</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter shipping address"
                                onChange={(e) => setShippingAddress(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid shipping address.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                            <Form.Label>Mobile Number</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter mobile"
                                maxlength="10"
                                onChange={(e) => setMobile(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a mobile number.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <div className='d-flex gap-3 justify-content-end'>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit">
                                Purchase Order
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PlaceOrder
