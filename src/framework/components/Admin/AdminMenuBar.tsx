import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenu } from '../../ReduxStore/adminMenu'; 
import { AdminSubmenu_Component } from '../../../entity/components/admin/subMenuComponent';
const AdminSubmenu = (_props:AdminSubmenu_Component)=>{
    const [button, setButton] = useState(0)
    const darkTheme = useSelector((state:any)=>state.theme.theme )
    const dispatch = useDispatch()
    const handleButtonClick = (menuname:any)=>{
        dispatch(setMenu(menuname))
    }
    return(
        <>
        <div className= {`${darkTheme} block p-2 w-full   rounded-xl`}>
            {/* <button type="button" onClick={()=>{setButton(0) ; handleButtonClick('profile')}}   className={ button==0? `text-blue-600 font-semibold shadow-blue-400 shadow-md   font-semiboldbold text-start p-3   bg-blue-200  h-100 rounded w-[150px] bg-gradient-to-l`: ` font-semiboldbold text-start p-3 rounded h-[100] w-[150px]`} >Profile</button> */}
            <button type="button" onClick={()=>{setButton(1) ; handleButtonClick('batches')} }   className={ button==1? `text-blue-600 shadow-blue-400 font-semibold shadow-md font-semiboldbold text-center p-3   bg-blue-200  h-100 rounded w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500    rounded h-[100] text-xs w-[100px]`} >BATCHES</button>
            <button type="button" onClick={()=>{setButton(2) ; handleButtonClick('programs')} }   className={ button==2? `text-blue-600 font-semiboldbold text-center p-3 font-semibold shadow-blue-400 shadow-md  bg-blue-200  h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500    rounded h-[100] text-xs w-[100px]`} >PROGRAMS</button>
            <button type="button" onClick={()=>{setButton(3)  ; handleButtonClick('approve')}}  className={ button==3? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-center p-3   bg-blue-200  h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500   rounded h-[100] text-xs w-[100px]`} >STAFF</button>
            <button type="button" onClick={()=>{setButton(4)  ; handleButtonClick('task')}}  className={ button==4? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-center p-3   bg-blue-200   h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500   rounded-md h-[100] text-xs w-[100px]`} >TASK</button>
            <button type="button" onClick={()=>{setButton(6)  ; handleButtonClick('Custommer')}}  className={ button==6? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-center p-3   bg-blue-200   h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500   rounded-md h-[100] text-xs w-[100px]`} >CUSTOMMER</button>
            <button type="button" onClick={()=>{setButton(5)  ; handleButtonClick('dashBoard')}}  className={ button==5? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-center p-3   bg-blue-200   h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500   rounded-md h-[100] text-xs w-[100px]`} >DASH BOARD</button>
            {/* <button type="button" onClick={()=>{setButton(6)  ; handleButtonClick('resume')}}  className={ button==6? `text-blue-600 font-semibold shadow-blue-400 shadow-md font-semiboldbold text-center p-3   bg-blue-200   h-100 rounded text-xs w-[100px] bg-gradient-to-l`: ` font-semiboldbold text-center p-3 border m-2 border-opacity-15 border-gray-400 hover:text-white  hover:bg-gray-500   rounded-md h-[100] text-xs w-[100px]`} >BIO DATA</button> */}
        </div>
         
        </>
    )
}

export default AdminSubmenu