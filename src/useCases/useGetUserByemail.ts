 
import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import {   utilityApis } from "../entity/constants/api"

const useGetUserByemail = (useremail:any)=>{

    const [result,setResult] =useState()
    useEffect(()=>{
        fetch()
    },[useremail])
    const fetch = async ()=>{
        const out = await axiosApi.post(utilityApis.getuserDetailsByEmail,{email:useremail})
        setResult(out.data)
        

    }
    return result;
}

export default useGetUserByemail