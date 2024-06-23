import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { MenuBar_Component } from "../../../entity/components/common/menuBar"

const MenuBar=(_props:MenuBar_Component)=>{
    const navigate =useNavigate() 
    const [button,setButton] = useState(0)
    const activeUser = useSelector((state:any)=>state.activeUser.user)
    const findHomePage = (user:any)=>{
        if(user =='admin') navigate('/Admin') 
        else if(user =='trainer') navigate('/Trainer')
        else if(user =='student') navigate('/Student') 
        else if(user =='user') navigate('/user') 
    }

   useEffect(()=>{
    handleMenuClick();
   },[button])
 
   const handleMenuClick = ()=>{
    if(button==1){
        findHomePage(activeUser.role)
    }
    else if(button==3){
        findHomePage(activeUser.role)
    }

}

    return(
        <div className="md:w-full md:flex-col w-10/12 flex rounded p-1    ">
            <button type="button" onClick={()=>{setButton(0) }} className={button==0? `text-blue-600 font-semiboldbold text-start p-3 m-1  bg-blue-200 w-full h-[50px] rounded-sm md:rounded-r-full `: ` font-semiboldbold text-start p-3 m-1   w-full h-[50px] rounded-sm md:rounded-r-full `} >Profile</button>
            <button type="button" onClick={()=>{setButton(1)}} className={button==1? `text-blue-600 font-semiboldbold text-start p-3 m-1  bg-blue-200 w-full h-[50px] rounded-sm md:rounded-r-full `: ` font-semiboldbold text-start p-3 m-1   w-full h-[50px] rounded-sm md:rounded-r-full `} >Home </button>
            <button type="button" onClick={()=>{setButton(2)}} className={button==2? `text-blue-600 font-semiboldbold text-start p-3 m-1  bg-blue-200 w-full h-[50px] rounded-sm md:rounded-r-full `: ` font-semiboldbold text-start p-3 m-1   w-full h-[50px] rounded-sm md:rounded-r-full `} >About us </button>
            <button type="button" onClick={()=>{setButton(3);navigate('/')}} className={button==3? `text-blue-600 font-semiboldbold text-start p-3 m-1  bg-blue-200 w-full h-[50px] rounded-sm md:rounded-r-full `: ` font-semiboldbold text-start p-3 m-1   w-full h-[50px] rounded-sm md:rounded-r-full `} >Pending Task </button>
        </div>
    )
}

export default MenuBar