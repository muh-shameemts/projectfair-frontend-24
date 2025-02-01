import React, { useContext, useEffect, useState } from 'react'
import { VscDiffAdded } from "react-icons/vsc";
import { FaGithub } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import Edit from '../Components/Edit'
import { addContextResponse, updateContextResponse } from '../ContextAPI/ContextShare';
import { deleteProjectAPI, getAUserProjectAPI } from '../Services/allAPI';

function View() {
  const {addContext,setAddContext} = useContext(addContextResponse)
  const {updateContext,setUpdateContext} = useContext(updateContextResponse)

  const [allProject,setAllProject]=useState([])

  const getAUserProject=async()=>{
    const token=sessionStorage.getItem('token')
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
        
        try{
          const response = await getAUserProjectAPI(reqHeader)
          console.log(response);
          if(response.status==200){
            setAllProject(response.data.response)
          }
    
        }
        catch(err){
          console.log(err);
          
        }
       
      }
else{
  alert('please login')
}
  }
  useEffect(()=>{
    getAUserProject()
  },[addContext,updateContext])

const deleteProject=async(projectId)=>{
  const token=sessionStorage.getItem('token')
  if(token){
    const reqHeader={
      "Content-Type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    
    try{
      const response = await deleteProjectAPI(projectId,reqHeader)
      console.log(response);
      
        alert(response.data)
      window.location.reload()

    }
    catch(err){
      console.log(err);
      
    }
   
  }
else{
alert('please login')
} 
}
  return (
<>
<div className='mt-4 ' style={{marginLeft:"140px"}}>
  {
    allProject.length>0 ? allProject.map((item)=>(
      <div className='container  shadow   mb-4'>
      <div className='row   text-black'>
        <div className="col-md-7"> <h4 className=''>{item.title}</h4></div>
        <div className="col-md-1 fs-3 text-primary"> <VscDiffAdded /></div>
        <div className="col-md-1 ps-2  fs-3  text-dark"> < FaGithub/></div>
        <div className="col-md-1 ps-2 fs-3  "> <Edit project={item}/></div>
        <div className="col-md-1 ps-2 fs-3 me-2 text-warning"> <AiTwotoneDelete onClick={()=>deleteProject(item._id)} />   </div>
        
        </div>
     </div>
  )):"Not Found"
    
  }
</div>
</>
  )
}

export default View