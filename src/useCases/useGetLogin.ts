import { useEffect, useRef,   } from "react"
import { useDispatch,   } from "react-redux"
import { login } from "../framework/ReduxStore/activeUser"
import axiosApi from "../framework/api/axios"
import { userApi } from "../entity/constants/api"
import { useNavigate } from "react-router-dom"



const useGetLogin = (role:string)=>{
    const documentRef :any = useRef()
    const navigate = useNavigate() 
    const dispatch = useDispatch()
    documentRef.current = document;
     const getLogin =async ()=>{
        if(role.length){
        const tempuser = await  axiosApi.get(userApi.getlogin+`/${role}`) 
        console.log(tempuser,'tempusertempuser')

        console.log(documentRef.current.cookie,'document.cookie')
        if(!tempuser.data.success && Object.keys(tempuser.data).length <=2 ) navigate('/signin') 
            
          if(Object.keys(tempuser.data).length > 2) dispatch(login(tempuser.data))
          }
    }
    useEffect(()=>{
        getLogin()
    },[])
 
}

export default useGetLogin