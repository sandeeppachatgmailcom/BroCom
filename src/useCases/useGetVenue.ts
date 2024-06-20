import { useEffect, useState } from "react"
import axiosApi from "../framework/api/axios"
import { utilityApis } from "../entity/constants/api"


const useGetVenue = ()=>{
    const [venue,setVenue] = useState()

    useEffect(()=>{
        getVenue()
    },[])
    const getVenue = async()=>{
        const venues =await axiosApi.get(utilityApis.listAllVenues)
         
        const data =JSON.parse(JSON.stringify(venues.data)).map((item:any)=>{
           return{ name:item.venueName,id:item.venueId}
        })
        setVenue(data)
    }
    
    return venue
        
}

export default useGetVenue


