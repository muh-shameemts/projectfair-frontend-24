import React, { useEffect, useState } from 'react'
import { LuSearchCheck } from "react-icons/lu";
import { getAllUserProjectAPI } from '../Services/allAPI';
import ProjectCard from '../Components/ProjectCard';

function Projects() {

  const [searchKey,setSearchKey] = useState("")
  const [allProject,setAllproject]=useState([])
 
const getAllUserProjects=async()=>{
  const token = sessionStorage.getItem("token")
if(token){
  const reqHeader={
    "Content-type":"multipart/form-data",
    "Authorization":`Bearer ${token}`
  }
  try{
const response = await getAllUserProjectAPI(searchKey,reqHeader)
console.log(response);
setAllproject(response.data.response)
  }
  catch(err){
console.log(err);

  }}
  else{
    alert("please login")
  }
}

console.log(allProject);
useEffect(()=>{
  getAllUserProjects()
},[searchKey])
    
  
  return (
 <div>
    <h2 style={{textAlign:"center"}} className='mt-5 text-black'>All Project</h2>
    <div className="container">
      <div style={{alignItems:"center",marginLeft:'230px',color:"white",width:"50%"}} className='mt-5 mb-5 d-flex'>
        <input type="text" placeholder='search by technology' onChange={e=>setSearchKey(e.target.value)} className='form-control' />
      <LuSearchCheck className='fs-2 fw-bolder mt-1 text-black' style={{marginLeft:"-35px"}} />

</div>
    </div>
    <div className="row mt-5">
     {
      allProject.length>0?allProject.map((item)=>(
        <div className="col-4"><ProjectCard project={item}/></div>
      )):'Not found'
     }
    </div>
 </div>
  )
}

export default Projects