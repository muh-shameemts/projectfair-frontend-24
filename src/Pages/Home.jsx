import React, { useEffect, useState } from 'react'
import ProjectCard from '../Components/ProjectCard'
import { Link } from 'react-router-dom'
import { getAllUserProjectAPI, getHomeProjectAPI } from '../Services/allAPI';

function Home() {
  
  // to hold token from session storage
  const [token,setToken]= useState("")
 
  
  useEffect(()=>{
    setToken(sessionStorage.getItem('token'))
  },[token])

const[projectDetails,setProjectDetails]=useState([])

   const getHomeProject=async()=>{
    try{
      const response = await getHomeProjectAPI()
      console.log(response);
      if(response.status==200){
        setProjectDetails(response.data.response)
      }
    //   else {
    //     console.error('Unexpected response status:', response.status);
    // }

    }
    catch(err){
      console.log(err);
      
    }
   }
     console.log(projectDetails);
     

   useEffect(()=>{
    getHomeProject()
   },[])

const checkToken=()=>{
  if(!token){
    alert("please login")
  }
}
  return (
   <div className='row mt-5'>
    <div className='col-5 p-5 my-6'>
      <h1>Project Fair</h1>
        <p className='mt-4'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, hic? Debitis autem tempore atque fugit modi libero veniam explicabo commodi, id, vero maxime, dignissimos ad quo illo nisi at esse?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur nesciunt enim exercitationem tempore, magni neque cum aperiam et suscipit distinctio minus officiis. Sit similique soluta nihil explicabo? Repellendus, alias dolores?Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque, ratione. Ad error architecto explicabo, delectus nesciunt rerum fugit nihil porro doloribus adipisci deserunt unde laudantium eius in sapiente! Nesciunt, doloribus.
        </p>
       <div>
        {
          token ?  <Link to={"/dashboard"}>
          <button className='btn mt-3 btn-light my-3'>Dashboard</button>
           </Link> :  <Link to={"/login"}>
    <button className='btn mt-3 btn-light my-3'>Get Started</button>
     </Link>
        }
       </div>
     
   
   </div>
   <div className='col-7  text-center'>
    <img width={'95%'} height={'450px'} src="website-3227784_640-removebg-preview.png" alt="" />
   </div>
   
   <div  className='container '>
    <h1 className='text-center m-5'>Explore Our Projects</h1>
    <div className='row  d-flex  justify-content-evenly'>
    {
      projectDetails.length>0
      ?
      projectDetails.map((item)=>(
        <div className='col-md-3'><ProjectCard project={item}/></div>
      )):"Can't load projects"
    }
     
      {/* <div className='col-3'><ProjectCard/></div> */}
      
    </div>
   </div>
<div className='text-center'>
 {
  token?<Link to={'/projects'}>
  <button onClick={checkToken} className='btn bg-light text-dark btn-center m-5'>
     View Projects
   </button>
   </Link>: <button  onClick={checkToken} className='btn bg-light text-dark btn-center m-5'>
     View Projects
   </button>
 }
</div>
   </div>

  )
}

export default Home