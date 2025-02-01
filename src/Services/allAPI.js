// const { commonAPI } = require("./commonAPI");
// const { serverUrl } = require("./serverURL");

import commonAPI  from "./commonAPI"
import { serverURL } from "./serverURL"

export const registerAPI = async (reqBody)=>{
    return await commonAPI('post',`${serverURL}/api/register` , reqBody,"")
}


export const loginAPI = async (reqBody)=>{
    return await commonAPI('post',`${serverURL}/api/login` , reqBody,"")
}

export const addProjectAPI = async (reqBody,reqHeader)=>{
    return await commonAPI('post',`${serverURL}/api/addProject`,reqBody,reqHeader)
}

export const getHomeProjectAPI = async ()=>{
    return await commonAPI('get',`${serverURL}/api/getAHomeProject`,"","")
}

export const getAllUserProjectAPI = async (searchKey,reqHeader)=>{
    return await commonAPI('get',`${serverURL}/api/getAllUserProject?search=${searchKey}`,"",reqHeader)
}

export const getAUserProjectAPI = async (reqHeader)=>{
    return await commonAPI('get',`${serverURL}/api/getAUserProject`,"",reqHeader)
}

export const deleteProjectAPI = async(projectId,reqHeader)=>{
    return await commonAPI('delete',`${serverURL}/api/deleteProject/${projectId}`,"",reqHeader)
}

export const updateProjectAPI = async(projectId,reqBody,reqHeader)=>{
    return await commonAPI('put',`${serverURL}/api/updateProject/${projectId}`,reqBody,reqHeader)
}