import React from 'react'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaGithub } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";
import { serverURL } from '../Services/serverURL';

function ProjectCard({project}) {
  console.log(project);
  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='d-flex mt-3 justify-content-center align-item-center' style={{marginLeft:'3px'}} >
      <MDBCard className='d-flex pb-2 p-2 border-bottom' style={{width:"450px",backgroundColor:"white"}}>
    <MDBCardImage height={'160px'} onClick={handleShow} src={`${serverURL}/uploads/${project?.projectImg}`} position='top' alt='...' />
    <MDBCardBody>
      <MDBCardTitle className='text-dark' >{project.title}</MDBCardTitle>
    </MDBCardBody>
  </MDBCard>

      <Modal style={{backgroundColor:'white'}} show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div className='col-md-6'><img width={'360'} className='mt-1 ms-0 me-2' height={'160px'}  src={`${serverURL}/uploads/${project?.projectImg}`} alt="" /></div>
            <div className='col-md-6'><h5>Description :</h5>
           <p>{
            project.description
           }</p>
              <h6>Technologies : <span>{project.language}</span></h6></div>
          </div>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly'>
        {/* <Button variant="danger" > */}
          <p className='fs-3'><FaGithub /></p>
          {/* </Button> */}
          {/* <Button variant="primary"> */}
          <p className='fs-3'> <a routerLink={project.github}></a>  <FaLink /></p>  
          {/* </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProjectCard