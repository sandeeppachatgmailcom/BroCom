import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { userApi } from "../entity/constants/api"



const useGetBatchWiseStudents = ()=>{
    const [result,setResult] = useState([])
    const fetch =async  ()=>{
        const data = await axiosApi.get(userApi.getBatchWiseStudentsList)
        setResult(data.data)
    }
    useEffect(()=>{
        fetch()
    },[])

    return result
}

export default useGetBatchWiseStudents