import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import APIService from '../../../APIService/APIService';
import { toast } from "react-toastify";

const VendorListings = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get vendor-specific orders
  const fetchVendorOrder = async () => {
    try {
      setLoading(true);
      const response = await APIService.getAllOrders();
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching vendor orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendorOrder();
  }, []);

  function formatDate(dataString) {
    const date = new Date(dataString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
  }

  const handleStatusChanging = async (orderObj, status) => {
    try {
      const updatedObj = { ...orderObj, status };
      const response = await APIService.updateOrderDetails(updatedObj, updatedObj.id);

      if (response.status === 200) {
        toast.success("Order Status Update Success!", {
          autoClose: 300,
          position: "top-right",
        });

        // Update order status locally after successful update
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderObj.id ? { ...order, status } : order
          )
        );
      }
    } catch (err) {
      console.error('Error updating order status', err);
      toast.error("Error Updating Order Status!", {
        autoClose: 300,
        position: "top-right",
      });
    }
  };

  return (
    <Container>
      <div className='mt-4'>
        <h4 className='d-flex align-items-center justify-content-center'>Your Orders</h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          orders?.length > 0 && orders.map((order, index) => (
            <Card
              style={{ maxWidth: '35rem', marginTop: '1rem', border: '1px solid grey' }}
              key={index}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ border: '1px solid grey', borderRadius: '5px', maxWidth: '200px' }}>
                  <Card.Img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png" />
                </div>
                <div>
                  <Card.Body>
                    <Card.Title>{order.product}</Card.Title>
                    <div style={{ display: 'flex', gap: '10rem' }}>
                      <Card.Text className="mb-1 text-muted">Order Id:</Card.Text>
                      <Card.Text className="mb-1 text-muted">{order.orderId}</Card.Text>
                    </div>

                    {order.orderItems.map((item, index) => (
                      <div key={index} className='d-flex align-items-center justify-content-between mt-2 gap-5'>
                        <Card.Subtitle className="mb-1 text-muted">{item.productName}</Card.Subtitle>
                        <Card.Subtitle className="mb-1 text-muted">{item.vendorName}</Card.Subtitle>
                        <Card.Subtitle className="mb-1 text-muted">x&nbsp;&nbsp;{item.quantity}</Card.Subtitle>
                      </div>
                    ))}

                    <div className='d-flex align-items-baseline justify-content-between mt-3 gap-5'>
                      <Card.Subtitle className="mb-2 text-muted">Ordered Date</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">{formatDate(order.createdAt)}</Card.Subtitle>
                    </div>
                    <div className='d-flex align-items-center justify-content-between gap-5 mt-2'>
                      <Card.Subtitle className="mb-2 text-muted">Total Amount</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Rs.{order.totalAmount}.00</Card.Subtitle>
                    </div>

                    <div className='d-flex align-items-baseline justify-content-between mt-2 gap-5'>
                      <Dropdown className='text-center'>
                        <Dropdown.Toggle
                          variant='info'
                          style={{ backgroundColor: "white" }}
                          className='dropdown_btn'
                          id="dropdown-basic"
                        >
                          <Badge
                            bg={
                              order.status === "Pending" ? "info" :
                              order.status === "Delivered" ? "success" :
                              order.status === "PartiallyDelivered" ? "warning" :
                              order.status === "Cancelled" ? "danger" : "secondary"
                            }
                            className='p-1'
                          >
                            {order.status} <i className="fa-solid fa-angle-down"></i>
                          </Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item onClick={() => handleStatusChanging(order, "Pending")}>mark as Pending</Dropdown.Item> */}
                          <Dropdown.Item onClick={() => handleStatusChanging(order, "Delivered")}>mark as Delivered</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleStatusChanging(order, "PartiallyDelivered")}>mark as PartiallyDelivered</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </Container>
  );
};

export default VendorListings;
