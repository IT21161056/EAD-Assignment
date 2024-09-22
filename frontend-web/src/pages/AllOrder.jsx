import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const AllOrder = () => {

    const [orders, setOrders] = useState(
        [
            {   
                id:'1',
                order_id: "Order_001",
                amount: "Rs.200.00",
                date: "9/8/2024",
                delivery_code: "dl##1",
                vendor_id:"ven001",
                quantity: 4,
                status: "Pending"
            },
            {   
                id:'2',
                order_id: "Order_002",
                amount: "Rs.500.00",
                date: "9/9/2024",
                delivery_code: "dl##2",
                vendor_id:"ven002",
                quantity: 2,
                status: "Delivered"
            },
            {   
                id:'3',
                order_id: "Order_003",
                amount: "Rs.150.00",
                date: "9/10/2024",
                delivery_code: "dl##3",
                vendor_id:"ven003",
                quantity: 1,
                status: "Partially delivered"
            }
        ]
    )

    //change status when toggling
    const handleStatusChanging = (id,status) => {
        setOrders(orders.map(order =>
            order.id ===id ? {...order,status} : order
        ))
    }
    
    return (
        <Container className='mt-4'>
            <div className='d-flex align-items-baseline justify-content-between'>
                <p></p>
                <h4>All Orders</h4>
                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Order cancellation requests</Tooltip>}>
                <Link to="/cancelRequest"><i class="bi bi-bell-fill" style={{fontSize:'1.92rem'}}></i>
                <Badge bg="secondary" className="position-absolute top-4">0</Badge>
                </Link>
                </OverlayTrigger>
            </div>
            <Table striped bordered hover className='mt-2'>
                <thead>
                    <tr>
                        <th>Order Id</th>
                        <th>Amount</th>
                        <th>Order Date</th>
                        <th>Product Id</th>
                        <th>Vendor Id</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.length > 0 ? orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.order_id}</td>
                                <td>{order.amount}</td>
                                <td>{order.date}</td>
                                <td>{order.delivery_code}</td>
                                <td>{order.vendor_id}</td>
                                <td>{order.quantity}</td>
                                <td className='d-flex align-items-center'>
                                    <Dropdown className='text-center'>
                                        <Dropdown.Toggle variant='info' style={{ backgroundColor: "white"}} className='dropdown_btn' id="dropdown-basic">
                                            <Badge bg={order.status == "Pending" ? "danger" : order.status === "Delivered" ? "success" : "warning"} className='p-1'>
                                                {order.status} <i className="fa-solid fa-angle-down"></i>
                                            </Badge>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleStatusChanging(order.id,"Pending")}>Pending</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChanging(order.id,"Delivered")}>Delivered</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleStatusChanging(order.id,"Partially delivered")}>Partially delivered</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                        )) : <tr><td>No orders were found</td></tr>
                    }
                </tbody>
            </Table>
        </Container>
    )
}

export default AllOrder
