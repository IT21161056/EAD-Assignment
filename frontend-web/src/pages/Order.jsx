import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import APIService from '../../APIService/APIService';

const Order = () => {

  const [orders, setOrders] = useState([])
  console.log(orders)

  const fetchOrders = async() => {
    try{
      const response = await APIService.getAllOrders()
      setOrders(response.data)
    }catch(err){
      console.log('error fetching orders')
    }
  }

  useEffect(() => {
    fetchOrders()
  },[])
  
  function formateDate(dataString){
    const date = new Date(dataString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2,'0')
    const day  = String(date.getDate()).padStart(2,'0')

    return `${year}.${month}.${day}`
  }

  return (
    <Container>
      <div className='mt-4'>
        <h4 className='d-flex align-items-center justify-content-center'>Placed Orders</h4>
        {
          orders?.length > 0 && orders?.map((order, index) => (
            <Card style={{ maxWidth: '35rem',marginTop:'1rem',border:'1px solid grey' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ border: '1px solid grey', borderRadius: '5px', maxWidth: '200px' }}>
                  <Card.Img src="https://consumer.huawei.com/content/dam/huawei-cbg-site/common/mkt/plp/phones-20230509/nova-series/nova12-i.png" />
                </div>
                <div>
                  <Card.Body>
                    <div style={{display:'flex',alignItems:'baseline',gap:'12rem'}}>
                    <Card.Text>Customer Name: </Card.Text>
                    <Card.Subtitle>{order.userName}</Card.Subtitle>
                    </div>
                    <div style={{display:'flex',gap:'15.23rem'}}>
                      <Card.Text className="mb-1 text-muted">OrderId</Card.Text>
                      <Card.Text className="mb-1 text-muted">{order.orderId}</Card.Text>
                    </div>

                    {order.orderItems.map((item, index) => (
                      <div key={index} className='d-flex align-items-center justify-content-between mt-2 gap-5'>
                        <Card.Subtitle className="mb-1 text-muted">{item.productName}</Card.Subtitle>
                        <Card.Subtitle className="mb-1 text-muted">x&nbsp;&nbsp;{item.quantity}</Card.Subtitle>
                      </div>
                    ))}
                    <div className='d-flex align-items-baseline justify-content-between mt-3 gap-5'>
                      <Card.Subtitle className="mb-2 text-muted">Ordered Date</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">{formateDate(order.createdAt)}</Card.Subtitle>
                    </div>
                    <div className='d-flex align-items-center justify-content-between gap-5 mt-2'>
                      <Card.Subtitle className="mb-2 text-muted">Total Amount</Card.Subtitle>
                      <Card.Subtitle className="mb-2 text-muted">Rs.{order.totalAmount.toFixed(2)}</Card.Subtitle>
                    </div>
                    <div className='d-flex align-items-baseline justify-content-between mt-2 gap-5'>
                      <Button size='sm' variant={
                         order.status == "Pending" ? 'primary' :
                         order.status == "Delivered" ? 'success' :
                         order.status == "Partially delivered"  ? 'warning' : 'Secondary'
                        } 
                      className='mt-2 px-3' style={{color:'white'}}>{order.status}</Button>
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

export default Order
