import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { FiLogOut } from "react-icons/fi";
import Add from '../Components/Add'
import View from '../Components/View'
import Profile from '../Components/Profile'

function Dashboard() {
  // to hold username from session storage
  const [username,setUsername]= useState("")  

  useEffect(()=>{
    setUsername(sessionStorage.getItem('username'))
  },[])
  return (
    <div className='bg-white'>
    
      <div className='row'>
        
<div className="col-md-6">  <h2 className='ms-5 text-dark mt-5 mb-5'>Welcome {username}</h2>
<Add/>

<View/>

</div>


<div  className="col-md-6" style={{marginTop:"140px"}}><Profile /></div>
</div>
      </div>
  )
}

export default Dashboard