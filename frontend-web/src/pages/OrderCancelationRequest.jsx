import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import CancelConfirmModal from '../components/CancelConfirmModal';

const OrderCancelationRequest = () => {

    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [cancelOrders, setCancelOrders] = useState([
        {
            orderId: 'Order##1',
            item: 'back cover',
            price: 'Rs.678.00',
            description: 'Order Cancellation Request'
        },
        {
            orderId: 'Order##2',
            item: 'phone charger',
            price: 'Rs.568.00',
            description: 'Order Cancellation Request 2'
        }
    ])

    return (
        <Container>
            <h6 className='mt-3'>Order Cancellation Requests</h6>
            <div className='mt-4'>
                {
                    cancelOrders.length > 0 && cancelOrders.map((order, index) => (
                        <Card style={{ width: '32rem', height: 'auto',marginTop:'1rem' }}>
                            <Card.Body>
                                <Card.Title>{order.orderId}</Card.Title>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <Card.Subtitle className="mb-1 text-muted">{order.item}</Card.Subtitle>
                                    <Card.Subtitle className="mb-1 text-muted">{order.price}</Card.Subtitle>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <Card.Text>{order.description}</Card.Text>
                                    <Card.Subtitle><Button variant='danger'
                                        onClick={handleShow}
                                        className='py-0 px-4 mt-4'>Cancel</Button>
                                    </Card.Subtitle>
                                </div>
                            </Card.Body>
                        </Card>
                    ))
                }
            </div>
            <CancelConfirmModal show={show} handleClose={handleClose} />
        </Container>
    )
}

export default OrderCancelationRequest
