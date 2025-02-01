import React, { useContext, useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { addContextResponse } from '../ContextAPI/ContextShare';
import { addProjectAPI } from '../Services/allAPI';


function Add() {
  const {addContext,setAddContext} = useContext(addContextResponse)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectDetails,setProjectDeatils]=useState({
    title:"",language:"",github:"",link:"",description:"",projectImg:""
  })
   //img displaying
  //step 1
  const [preview,setPreview] = useState("")

  const handleAdd = async()=>{
console.log(projectDetails);
const {title,language,github,link,description,projectImg}=projectDetails
if(!title || !language || !github || !link || !description || !projectImg){
alert("please fillt he form")
}
else{
  //API fetching
  const reqBody = new FormData()
  reqBody.append("title",title),
  reqBody.append("language",language),
  reqBody.append("github",github),
  reqBody.append("link",link),
  reqBody.append("description",description),
  reqBody.append("projectImg",projectImg)

  const token = sessionStorage.getItem("token")
  if(token){
    const reqHeader={
      "Content-type":"multipart/form-data",
      "Authorization":`Bearer ${token}`
    }
    try{
      const response = await addProjectAPI(reqBody,reqHeader)
      console.log(response);
      if(response.status==200){
        alert("Project Added Succesfully")
        setAddContext(response.data.response)
        setProjectDeatils({
          title:"",language:"",github:"",link:"",description:"",projectImg:""
        })
        setPreview("")
       handleClose()
      }
      else{
        console.log("error");
        
      }
      
    }
    catch(err){
      console.log("Error" + err);
      
    }
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
      <div className="row ms-5">
      <div className="col-md-2"></div>
        <div className="col-md-4">      <h3 className='text-dark'>My Projects</h3>
        </div>
        
        <div className="col-md-4"></div>
        <div className="col-md-2">      <Button onClick={handleShow} variant="success">ADD</Button>{' '}
        </div>
        </div>
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
                <img src={preview?preview:"https://thumbs.dreamstime.com/b/business-development-project-management-product-improvement-research-tiny-people-process-develop-upgrade-engine-settings-319779694.jpg"} width={'100%'} className=' me-2' alt="" />
              </label>
            </div>
            <div className="col-md-7">
            <input onChange={e=>setProjectDeatils({...projectDetails,title:e.target.value})} style={{width:"100%",borderRadius:'8px'}} className='mt-4' placeholder='Title' type="text" />
            <input onChange={e=>setProjectDeatils({...projectDetails,language:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Language' type="text" />
            <input onChange={e=>setProjectDeatils({...projectDetails,github:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Git Hub' type="text" />
            <input onChange={e=>setProjectDeatils({...projectDetails,link:e.target.value})}  style={{width:"100%",borderRadius:'8px',marginTop:"8px"}} placeholder='Website' type="text" />
            <input onChange={e=>setProjectDeatils({...projectDetails,description:e.target.value})}  style={{width:"100%",height:'60px',borderRadius:'8px',marginTop:"8px"}} placeholder='Overview' type="text" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="primary" onClick={handleClose}>
             Cancel
          </Button>
          <Button type='button' variant="secondary" onClick={handleAdd}>
            Add 
          </Button>
        </Modal.Footer>
      </Modal>
       </div>
    </div>
  )
}

export default Add