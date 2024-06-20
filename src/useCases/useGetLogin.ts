import { useEffect,   } from "react"
import { useDispatch,   } from "react-redux"
import { login } from "../framework/ReduxStore/activeUser"
import axiosApi from "../framework/api/axios"
import { userApi } from "../entity/constants/api"
import { useNavigate } from "react-router-dom"



const useGetLogin = (role:string)=>{
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    const getLogin =async ()=>{
        const tempuser = await  axiosApi.get(userApi.getlogin+`/${role}`) 
        
        if(!tempuser.data.success && Object.keys(tempuser.data).length <=2 ) navigate('/signin') 
            
        else if(Object.keys(tempuser.data).length > 2) dispatch(login(tempuser.data))
    }

    useEffect(()=>{
        getLogin()
    },[role])
 
}

export default useGetLogin