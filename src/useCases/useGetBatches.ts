import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { utilityApis } from "../entity/constants/api"

const useGetBatches = ()=>{
    const [batch,setBatch] = useState<{name:string,id:string}[]>()
    useEffect(()=>{
        fetchBatch()
    },[])
    const fetchBatch =async ()=>{
        const responce = await axiosApi.get(utilityApis.listAllBatches)
        console.log(responce.data,'test responce')
        const data:{name:string,id:string}[] = Object.keys(responce.data).map((item)=>{
            return { name:responce.data[item].batchName, id:responce.data[item].batchId }
        })
        console.log(data,'test responce')
        setBatch(data)
    }
    console.log(batch,'batches')

    return batch
}


export default useGetBatches