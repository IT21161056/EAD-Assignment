import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const PlaceOrder = ({show,handleClose,totalAmount}) => {
    const [validated, setValidated] = useState(false);
    const [name,setName] = useState("")
    const [shippingAddress,setShippingAddress] = useState("")
    const [mobile,setMobile] = useState("")

    const orderDetails = localStorage.getItem("localCartData")

    const handleFormData = () => {
        const orderObj = {
            name,
            shippingAddress,
            mobile,
            orderDetails:JSON.parse(orderDetails)
        }
        console.log(orderObj)
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }else{
            event.preventDefault();
            handleFormData()
            setValidated(true);
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
