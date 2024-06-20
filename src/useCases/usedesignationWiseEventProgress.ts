import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios";
import { trainerApi } from "../entity/constants/api";
import { useSelector } from "react-redux";


const usedesignationWiseEventProgress = ()=>{
    const [result, setResult] = useState();
    const user = useSelector((state:any)=>state.activeUser.user)
    
    const fetchResult = async ()=>{
        const result =await axiosApi.post(trainerApi.designationWiseEventProgress,{designation:user.designation})
        setResult(result.data)
    }
    useEffect(()=>{
        fetchResult()
    },[])
    return result;
}
export default usedesignationWiseEventProgress