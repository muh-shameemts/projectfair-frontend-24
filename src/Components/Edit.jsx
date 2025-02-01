import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { updateProjectAPI } from '../Services/allAPI';
import { FaEdit } from "react-icons/fa";
import { serverURL } from '../Services/serverURL';
import { updateContextResponse } from '../ContextAPI/ContextShare';

function Edit({project}) {
  console.log(project);
  
  const {updateContext,setUpdateContext} = useContext(updateContextResponse)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails,setProjectDeatils]=useState({
    id:project._id,
    title:project.title,
    language:project.language,
    github:project.github,
    link:project.link,
    description:project.description,
    projectImg:""
  })
   //img displaying
  //step 1
  const [preview,setPreview] = useState("")

  const handleUpdate = async()=>{
console.log(projectDetails);
const {id,title,language,github,link,description,projectImg}=projectDetails
// if(!title || !language || !github || !link || !description || !projectImg){
// alert("please fill he form")
// }

  //API fetching
  const reqBody = new FormData()
  reqBody.append("title",title),
  reqBody.append("language",language),
  reqBody.append("github",github),
  reqBody.append("link",link),
  reqBody.append("description",description),
  preview?reqBody.append("projectImg",projectImg):reqBody.append("projectImage",project.projectImage)
  const token = sessionStorage.getItem("token")
  if(preview){
    const reqHeader={
      "Content-type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    console.log(reqHeader);
    
    try{
      const response = await updateProjectAPI(id,reqBody,reqHeader)
      console.log(response);
      if(response.status==200){
        alert("Project Updated Succesfully")
      handleClose()
      setUpdateContext(response.data)

      }

      else{
        console.log("eror"+response.response.data);
        
      }
      
    }
    catch(err){
      console.log("Error" + err);
      
    }
  }
  else{
    const reqHeader={
      "Content-type":"application/json",
      "Authorization":`Bearer ${token}`
    }
    console.log(reqHeader);
    
    try{
      const response = await updateProjectAPI(id,reqBody,reqHeader)
      console.log(response);
      if(response.status==200){
        alert("Project Updated Succesfully")
        handleClose()
        setUpdateContext(response.data)

      }

      else{
        console.log("eror"+response.response.data);
        
      }
      
    }
    catch(err){
      console.log("Error" + err);
      
    }
  }

  }
  useEffect(()=>{
//step 2 convert img file into url
if(projectDetails.projectImg){
  setPreview(URL.createObjectURL(projectDetails.projectImg))
}
  },[projectDetails.projectImg])


  return (
    <div>
     <FaEdit className='text-warning' onClick={handleShow}/>
       <div className='bg-light'>
       <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header className='bg-white' closeButton>
          <Modal.Title>Project Name</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bg-white'>
          <div className="row">
            <div className="col-md-5">
              <label>
                <input  onChange={e=>setProjectDeatils({...projectDetails,projectImg:e.target.files[0]})} type='file' style={{display:'none'}}/>
                <img src={preview?preview:`${serverURL}/uploads/${project.projectImg}`} width={'100%'} height={'400px'} className=' me-2' alt="" />
              </label>
            </div>
            <div className="col-md-7">
            <input value={projectDetails.title} onChange={e=>setProjectDeatils({...projectDetails,title:e.target.value})} style={{width:"100%",borderRadius:'8px'}} className='mt-4' placeholder='Title' type="text" />
            <input value={projectDetails.language}  onChange={e=>setProjectDeatils({...projectDetails,language:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Language' type="text" />
            <input value={projectDetails.github}  onChange={e=>setProjectDeatils({...projectDetails,github:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Git Hub' type="text" />
            <input value={projectDetails.link}  onChange={e=>setProjectDeatils({...projectDetails,link:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Website' type="text" />
            <input value={projectDetails.description}  onChange={e=>setProjectDeatils({...projectDetails,description:e.target.value})}  style={{width:"100%",height:'60px',borderRadius:'8px',marginTop:"8px"}} placeholder='Overview' type="text" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type='button' variant="secondary" onClick={handleUpdate}>
            Add 
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
       </div>
  )
}

export default Edit