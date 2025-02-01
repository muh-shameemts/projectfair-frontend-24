
import React, { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand
} from 'mdb-react-ui-kit';
import { SiVfairs } from "react-icons/si";
import { Link } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';

function Header() {
  const [token,setToken]=useState("")
  useEffect(()=>{
    setToken(sessionStorage.getItem("token"))
  },[token]
) 

  const handleLogout=()=>{
    sessionStorage.removeItem("token")
    setToken("")
  }

  return (
    <MDBNavbar  light bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand className='border-light p-3' href='#'>
         <div className=' d-flex justify-content-between'>
            <div  className=' d-flex'>
              <SiVfairs style={{color:'yellow',fontSize:"40px",margin:"4px"}} />
    
               <h3 style={{color:"white" ,paddingTop:"5px",paddingLeft:"5px"}}> Project Fair</h3>
            </div>
             
             
         </div>
          </MDBNavbarBrand>
          {
            token&&
            <Link to={'/login'}>
            <MDBBtn onClick={handleLogout} style={{float:'right'}} className='me-1' color='danger'>
            <IoMdLogOut className='fs-3' />
         </MDBBtn></Link>
            
           
          }
        </MDBContainer>
      </MDBNavbar>
      // <div className="col-md-6 " >
   
              
      // </div>
  )
}

export default Header