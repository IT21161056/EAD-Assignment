import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import APIService from '../../../APIService/APIService';


const VendorListings = () => {

  const [orders, setOrders] = useState([])

  //get vendor specific orders
  const fetchVendorOrder = async() => {
    try{
      const response = await APIService.getAllOrders()
      setOrders(response.data)
      console.log(response)
    }catch(err){
      console.error('Error fetching vendor orders')
    }finally{

    }
  }

  useEffect(() => {
    fetchVendorOrder()
  },[])

  function formateDate(dataString) {
    const date = new Date(dataString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}.${month}.${day}`
  }

  return (
    <Container>
    <div className='mt-4'>
      <h4 className='d-flex align-items-center justify-content-center'>Your Orders</h4>
      {
        orders?.length > 0 && orders?.map((order, index) => (
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

                  {order.orderItems.map((item, index) => (
                    <div key={index} className='d-flex align-items-center justify-content-between mt-2 gap-5'>
                      <Card.Subtitle className="mb-1 text-muted">{item.productName}</Card.Subtitle>
                      <Card.Subtitle className="mb-1 text-muted">{item.vendorName}</Card.Subtitle>
                      <Card.Subtitle className="mb-1 text-muted">x&nbsp;&nbsp;{item.quantity}</Card.Subtitle>
                    </div>
                  ))}
                  <div className='d-flex align-items-baseline justify-content-between mt-3 gap-5'>
                    <Card.Subtitle className="mb-2 text-muted">Ordered Date</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">{formateDate(order.createdAt)}</Card.Subtitle>
                  </div>
                  <div className='d-flex align-items-center justify-content-between gap-5 mt-2'>
                    <Card.Subtitle className="mb-2 text-muted">Total Amount</Card.Subtitle>
                    <Card.Subtitle className="mb-2 text-muted">Rs.{order.totalAmount}.00</Card.Subtitle>
                  </div>
                  <div className='d-flex align-items-baseline justify-content-between mt-2 gap-5'>
                    <Button size='sm' variant={
                      order.status == "Pending" ? 'primary' :
                      order.status == "Delivered" ? 'success' :
                       order.status == "PartiallyDelivered"  ? 'warning' :
                       order.status == "Cancelled"  ? 'danger' : 'Secondary'
                      } className='mt-2 px-3' style={{color:'white'}}>{order.status}</Button>
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
