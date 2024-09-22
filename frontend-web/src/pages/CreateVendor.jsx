import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import VendorModal from '../components/VendorModal';


const CreateVendor = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container className='mt-4'> 
      <div className='d-flex align-items-baseline justify-content-between'>
      <p></p>
      <h4>Vendors</h4>
      <Button variant="primary" onClick={handleShow}>Add New</Button>
      </div>
      <Table striped bordered hover className='mt-2'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>User Id</th>
          <th>Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>anoj</td>
          <td>anoj@gmail.com</td>
          <td>077365289</td>
          <td>Ven001</td>
          <td>Good</td>
        </tr>
        <tr>
          <td>pasindu</td>
          <td>pasindu@gmail.com</td>
          <td>0773658975</td>
          <td>Ven002</td>
          <td>Excellent</td>
        </tr>
        <tr>
          <td>vikum</td>
          <td>vikum@gmail.com</td>
          <td>0773658975</td>
          <td>Ven003</td>
          <td>Excellent</td>
        </tr>
      </tbody>
    </Table>
    <VendorModal show={show} handleClose={handleClose}/>
    </Container>
  )
}

export default CreateVendor
