import { FaUserGraduate } from "react-icons/fa6";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaChessKing } from "react-icons/fa";
import axiosApi from "../../framework/api/axios";
import { userApi } from "../../entity/constants/api";
import { useNavigate } from "react-router-dom";

import { useDispatch  } from "react-redux";
import { login } from "../../framework/ReduxStore/activeUser";
 
const Role = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const getLogin =async (role:any)=>{
        console.log(userApi.getlogin+`/${role}`,'userApi.getlogin+`/${role}`')
        const tempuser = await axiosApi.get(userApi.getlogin+`/${role}`) 
        console.log(tempuser,'tempuser')
        if(tempuser.data.success){
            dispatch(login(tempuser.data))
            if(Object.keys(tempuser.data).length && tempuser.data.otpVerified) navigate(`/${tempuser.data.role}`)
        }
        else{
            navigate('/signin')
        }
    }
 


    const handleuserRole =async (role:string)=>{
        try {
             await getLogin(role) 
        } catch (error) {
            
        }
    }
    

    return(
        <div className="items-center h-[100%] justify-center w-full flex flex-col ">
            <div className="items-center h-10 justify-center w-full flex flex-col ">
                    <h1 className="text-2xl">Choose a role   </h1>
            </div>
            <div className="items-center h-[30%] justify-center w-full flex flex-col ">
                <div className="  flex w-6/12 h-[100%] items-center justify-center rounded-2xl    ">
                    <div onClick={()=>handleuserRole('manGrowadmin')} className=" hover:text-orange-500 m-3 cursor-pointer w-[3/12] h-[90%] text-blue-400 shadow-2xl p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <FaChessKing className="h-full w-[50%]   m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Admin </h1>
                    </div>
                    <div onClick={()=>handleuserRole('manGrowtrainer')} className="  m-3 cursor-pointer w-3/12 hover:text-orange-500 h-[90%] text-blue-400 shadow-2xl p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <GiPoliceOfficerHead className="h-full w-[50%] m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Staff </h1>
                    </div>
                    <div onClick={()=>handleuserRole('manGrowstudent')} className="   m-3 cursor-pointer w-3/12 hover:text-orange-500 h-[90%] text-blue-400 shadow-2xl   p-8 rounded-full flex flex-col justify-center items-center  bg-blue-900 bg-opacity-10">
                        <FaUserGraduate className="h-full w-[50%] m-1 p-1" />
                        <h1 className="font-bold text-2xl items-center">Student </h1>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Role