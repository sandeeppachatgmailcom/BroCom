import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { trainerApi } from "../entity/constants/api"

const useWeeklyStudentsDetails=()=>{
    const [result,setResult] = useState()

    const fetchuWeeklyStudentsDetails= async ()=>{
        try {
            const data:any= await axiosApi.get(trainerApi.getWeeklyStudentssummary)
    
        const temp = data?.data?.map((item:any)=>{ return {Xvalue:item?._id,students:item?.count}})
        temp.sort((a:any,b:any)=>a.Xvalue-b.Xvalue)
        setResult(temp)
    } catch (error) {
            
        }
    }
    
    useEffect(()=>{
        fetchuWeeklyStudentsDetails()
    },[])

    return result
}

export default useWeeklyStudentsDetails 