import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Order = () => {

  const [orders, setOrders] = useState(
    [
      {
        product: 'IPhone',
        orderId: 'Order001',
        vendorId:'vendor001',
        total: 450,
        products: [
          {
            name: "Iphone",
            quantity: 4
          },
          {
            name: "Samsung",
            quantity: 5
          }
        ],
        orderDate: '2024.8.9',
        status: 'Pending'
      },
      {
        product: 'IPhone',
        orderId: 'Order001',
        vendorId:'vendor001',
        total: 450,
        products: [
          {
            name: "Iphone",
            quantity: 4
          },
          {
            name: "Samsung",
            quantity: 5
          }
        ],
        orderDate: '2024.8.9',
        status: 'Pending'
      }
    ]
  )

  return (
    <Container>
      <div className='mt-4'>
        <h4 className='d-flex align-items-center justify-content-center'>Placed Orders</h4>
        {
          orders.length > 0 && orders.map((order, index) => (
            <Card style={{ maxWidth: '35rem',marginTop:'1rem',border:'1px solid grey' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ border: '1px solid grey', borderRadius: '5px', maxWidth: '200px' }}>
                  <Card.Img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png" />
                </div>
                <div>
                  <Card.Body>
                    <Card.Title>{order.product}</Card.Title>
                    <div style={{display:'flex',gap:'10rem'}}>
                      <Card.Text className="mb-1 text-muted">Order Id:</Card.Text>
                      <Card.Text className="mb-1 text-muted">{order.orderId}</Card.Text>
                    </div>

                    {order.products.map((item, index) => (
                      <div key={index} className='d-flex align-items-center justify-content-between mt-2 gap-5'>
                        <Card.Subtitle className="mb-1 text-muted">{item.name}</Card.Subtitle>
                        <Card.Subtitle className="mb-1 text-muted">x&nbsp;&nbsp;{item.quantity}</Card.Subtitle>
                      </div>
                    ))}
                    <div className='d-flex align-items-baseline justify-content-between mt-3 gap-5'>
                      <Card.Subtitle className="mb-2 text-muted">Ordered Date</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">{order.orderDate}</Card.Subtitle>
                    </div>
                    <div className='d-flex align-items-center justify-content-between gap-5 mt-2'>
                      <Card.Subtitle className="mb-2 text-muted">Total Amount</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Rs.{order.total}.00</Card.Subtitle>
                    </div>
                    <div className='d-flex align-items-baseline justify-content-between mt-2 gap-5'>
                      <Button size='sm' variant="primary" className='mt-2 px-3'>{order.status}</Button>
                      <div className='d-flex gap-3'>
                        <div style={{
                          backgroundColor: '#ffcc00', padding: '1.13rem', width: '25px',cursor:'pointer',
                          height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <i class="bi bi-pencil" style={{ fontSize: '1.3rem' }}></i></div>

                        <div style={{
                          backgroundColor: 'red', padding: '1.13rem', width: '25px',cursor:'pointer',
                          height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}><i class="bi bi-trash" style={{ fontSize: '1.3rem' }}></i></div>
                      </div>
                    </div>
                  </Card.Body>
                </div>
              </div>
            </Card>
          ))
        }

      </div>
    </Container>
  )
}

export default Order
