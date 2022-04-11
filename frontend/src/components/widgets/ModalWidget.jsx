import React from 'react'
import { Button,Modal} from 'react-bootstrap';

const ModalWidget = ({setShowModal, showModal}) => {
  return (
    <Modal show={showModal} onHide={()=>setShowModal(false)}>  
      <Modal.Header closeButton>SuccessFul</Modal.Header>  
      <Modal.Body>Registration Successful</Modal.Body>  
      <Modal.Footer>  
        <Button onClick={()=>setShowModal(false)}>Close</Button>    
      </Modal.Footer>  
    </Modal>
  )
}

export default ModalWidget