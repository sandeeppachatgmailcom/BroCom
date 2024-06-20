import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { utilityApis } from "../entity/constants/api"

const useStudentProgressSummary = ({email}:{email:string})=>{
const [result, setResult] = useState()

useEffect(()=>{
    fetch()
},[email])
const fetch = async ()=>{
    const tempResult = await axiosApi.post( utilityApis.studentsTaskProgressRatio ,{email:email})
    
    setResult( tempResult?.data)
}
 
return result;

}

export default useStudentProgressSummary