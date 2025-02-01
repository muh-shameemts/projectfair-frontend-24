import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import {  loginAPI, registerAPI } from '../Services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth({register}) {
  const [userDetails,setuserDetails]=useState({
    username:"",
    email:"",
    password:""
  })
const navigate = useNavigate()

  const handleRegister = async()=>{
    console.log(userDetails);
    const {username,email,password}=userDetails
    if( !username || !email || !password){
      toast.warn('please fill the form', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored"
        });
    
    }
    else{
      console.log("inside else");
      
      try{
        const result = await registerAPI(userDetails);
        console.log(result);
        if(result.status >=200 && result.status<=300){
          toast.success('Register Successfully.....', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
           
            });
         setTimeout(()=>{
          navigate('/login')
         },5000)
        
        }
        else{
          
          toast.warn(result.response.data, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
            });
         
        }
      }
      catch(err){
          console.log('error:'+err);
      }
      
    }

   
    }
    const handleLogin=async()=>{
      const{email,password}=userDetails
      if(!email || !password){
        toast.warn('please fill the form', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
          });
      }
      else{
        try{
          const result = await loginAPI(userDetails);
          console.log(result);
          if(result.status>=200 && result.status<=300){
            toast.success('Login Successfully.....', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored"
             
              });
              setTimeout(()=>{
                navigate('/')
               },5000)
               sessionStorage.setItem("token",result.data.token)
               sessionStorage.setItem("username",result.data.user.username)

          }
          else{
            toast.warn(result.response.data, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light"
              });
           
          }
        }
        catch(err){
            console.log('error:'+err);
        }
        
      }
    }

  return (
  <div>
      <div className='text-black container bg-white mt-5 mb-5 rounded shadow'>
      <div className="row">
        <div className="col-md-6"> <img width={500}  className='mt-5 mb-5' src="https://media.istockphoto.com/id/1399269167/vector/project-manager-vector-illustration.jpg?s=612x612&w=0&k=20&c=dVkyccr_fYJLbaIxQFe_wUDdJ5gVY9tt2atewWdDtAE=" alt="" />  </div>
        <div className="col-md-6 mt-5">
          <h1>Sign {register ? 'up' : 'in'}
          </h1>
          <form>
            {
                register &&
                <input type="text"onChange={e=>setuserDetails({...userDetails,username:e.target.value})} placeholder='Username'  className='form-control'/>
            }
            <input type="text" onChange={e=>setuserDetails({...userDetails,email:e.target.value})} placeholder='Email' className='form-control mt-3' />
            <input type="password" onChange={e=>setuserDetails({...userDetails,password:e.target.value})} placeholder='Password' className='form-control mt-3'/>

            {
              register ?
                <div>          
                <Button className='mt-3 w-50' variant="outline-success" onClick={handleRegister} type='button'>Sign Up</Button>{' '}                
                <p className='mt-3'>Already Registerd ? <Link className='text-primary' to={"/login"}>Please Login From Here
                </Link>
                </p>
               </div>
               :
               <div>
              <Button className='mt-3 w-50' onClick={handleLogin} variant="outline-success">Sign In</Button>{' '}             
              <p className='mt-3'>New To Here ? <Link  className='text-warning' to={"/register"}>Please Register From Here</Link></p>
               </div>
            }
          </form>
        </div>
      </div>
    </div>
    <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
  </div>
  )
}

export default Auth



// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { MDBBtn } from 'mdb-react-ui-kit';
// import {  registerAPI } from '../Services/allAPI';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// function Auth({register}) {
//   const [userDetails,setUserDetails]=useState({
//     username:"",
//     email:"",
//     password:"",
//   })
//  const navigate= useNavigate()
  

//   const handleRegister=async()=>{
//     const {username,email,password}=userDetails
//     if(!username||!email||!password){
//       toast.warn('Please fill the form', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
       
//         });
      
//     }
//     else{
//       try{
//         const response = await registerAPI(userDetails)
//         console.log(response);
//         if(response.status>=200 && response.status<300){
//           toast.success('Registration Successfull', {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
           
//             });
//             setTimeout(()=>{
//               navigate('/login')
//             },3000)
          
//         }else{
//           toast.error(response.response.data, {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
           
//             });
          
//         }
//       }
      
//       catch(err){
//         console.log('error '+err);
        
//       }
//     }
//   }
   
//   const handleLogin = async () => {
//     const { email, password } = userDetails
//     if (!email || !password) {
//       toast.warn('Please fill the form', {
//         position: "top-center",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     } else {
//       try {
//         const response = await loginAPI(userDetails);
//         console.log(response);
//         if (response.status >= 200 && response.status < 300) {
//           toast.success('Login Successful', {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           setTimeout(() => {
//             navigate('/dashboard');
//           }, 3000);
//         } else {
//           toast.error(response.response.data, {
//             position: "top-center",
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//         }
//       } catch (err) {
//         console.log('Error ', err);
       
//       }
//     }
//   }
        
          
        
  
  
//   return (
//     <div>
//       <div className="container shadow mt-5 rounded p-5">
//         <div className="row">
//           <div className="col-md-6">
//             <img src="https://www.alphaebarcode.com/images/Ecommorce/B2B.png" width={'100%'} alt="" />
//           </div>
//           <div className="col-md-6">
//             <h1 className='text-center mt-5 text-primary'>Sign {register?'Up':'In'}</h1>
//             <form>
//               {
//                 register &&
//                 <input onChange={e=>setUserDetails({...userDetails,username:e.target.value})} type="text" placeholder='Username' className='form-control mb-2'/>
//               }
//               <input onChange={e=>setUserDetails({...userDetails,email:e.target.value})} type="text" placeholder='Email' className='form-control mb-2'/>
//               <input onChange={e=>setUserDetails({...userDetails,password:e.target.value})} type="password" placeholder='Password' className='form-control mb-2'/>
//               {
//                 register?
//                 <div className='text-center mt-3'>
//                   <MDBBtn onClick={handleRegister} type='button'>Sign Up</MDBBtn>
//                   <p className='mt-2'>Already registered ?<Link to={'/login'}>login</Link></p>
//                 </div>
//                 :
//                 <div className='text-center mt-3'>
//                    <MDBBtn onClick={handleLogin} type='button'>Sign In</MDBBtn>
//                   <p className='mt-2'>New to Here ?<Link to={'/register'}>register</Link></p>
//                 </div>
//               }
//             </form>
            
             
             
           
//           </div>
//         </div>
//       </div>
//       <ToastContainer
// position="top-center"
// autoClose={2000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"

// />

//     </div>
//   )
// }

// export default Auth