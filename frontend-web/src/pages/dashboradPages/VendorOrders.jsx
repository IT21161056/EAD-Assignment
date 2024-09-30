import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const VendorListings = () => {

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
        status: 'Purchased'
      },
    ]
  )
  return (
    <Container>
    <div className='mt-4'>
      <h4 className='d-flex align-items-center justify-content-center'>Your Orders</h4>
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
                    <Button size='sm' variant={
                      order.status == "Purchased" ? 'primary' :
                      order.status == "Delivered" ? 'success' :
                       order.status == "Partially delivered"  ? 'warning' : 'Secondary'
                      } className='mt-2 px-3' style={{color:'white'}}>{order.status}</Button>
                    <div className='d-flex gap-3'>
                      <div style={{
                        backgroundColor: '#ffcc00', padding: '1.13rem', width: '25px',cursor:'pointer',
                        height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <OverlayTrigger  placement="left" overlay={<Tooltip id="tooltip-disabled">Edit order</Tooltip>}> 
                           <i class="bi bi-pencil" style={{ fontSize: '1.3rem' }}></i>
                        </OverlayTrigger>
                        </div>

                      <div style={{
                        backgroundColor: 'red', padding: '1.13rem', width: '25px',cursor:'pointer',
                        height: '25px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        <OverlayTrigger  placement="right" overlay={<Tooltip id="tooltip-disabled">Cancel order</Tooltip>}> 
                           <i class="bi bi-x-lg"></i>
                        </OverlayTrigger>
                      </div>
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

export default VendorListings
