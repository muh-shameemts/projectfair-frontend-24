import React from 'react'
import { FaTentArrowsDown } from "react-icons/fa6";
import  { useState } from 'react';
import { MDBCollapse, MDBBtn } from 'mdb-react-ui-kit';

function Profile() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div>
      <div style={{width:"300px"}} className="container shadow">
        <div className="row">
          <div className="col-md-9"><h6 className='text-black mt-3 mb-3'>Profile Update !</h6></div>
          <div className="col-md-3 fs-3 mt-1 text-primary "><FaTentArrowsDown onClick={toggleOpen} />

          </div>
        </div>
        <MDBCollapse className='mb-3' open={isOpen}>
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim
        keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
      </MDBCollapse>
      </div>
    </div>
  )
}

export default Profile