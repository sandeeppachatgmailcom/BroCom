import { useEffect,   } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../framework/ReduxStore/activeUser"
import axiosApi from "../framework/api/axios"
import { userApi } from "../entity/constants/api"



const useGetSubmissionDetails = ()=>{
    const formData = useSelector((state:any)=> state.activeUser.user)
    const dispatch = useDispatch()
        console.log('test Data ')
    const getLogin =async ()=>{
        const tempuser = await  axiosApi.get(userApi.getSubmissionDetails,formData ) 
        dispatch(login(tempuser.data))
    }

    useEffect(()=>{
        getLogin()
    },[])
 
}

export default useGetSubmissionDetails