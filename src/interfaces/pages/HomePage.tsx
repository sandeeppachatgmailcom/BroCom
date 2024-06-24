import { useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import ChatBox from "../../framework/components/chatBox/chatBox";
import StudentsPending from "../../framework/components/student/StudentsPending";
import { Home_Page } from "../../entity/pages/homePage";
import StudentHistory from "../../framework/components/student/StudentHistory";
import useGetLogin from "../../useCases/useGetLogin";
import Gallery from "../../framework/components/utilComponents/Gallery";


const HomePage = (_props: Home_Page) => {
    useGetLogin('manGrowstudent')
    const [menu,setMenu] = useState(1)
    const darkTheme = useSelector((state: any) => state.theme)
    const activeUser = useSelector((state: any) => state.activeUser.user)
    
    const divlign = 'rounded  mt-1 '

    return (
        <div className="xl:flex block h-[100%] overflow-scroll   w-full p-2">
            <div className={`xl:w-2/12 w-full  ${darkTheme.theme + divlign} xl:h-[100%]  border-gray-300   rounded-xl mt-2 p-2`}>
                <div className="bg-transparent " >
                    <Profile />
                </div>
                <div className="">
                     {/* <MyCalender   />    */}
                </div>
            </div>
            <div className={`block xl:w-7/12   w-full h-[100%]   rounded-xl m-2 mt-2 p-2  ${darkTheme.theme} ${divlign} `}>
            {menu == 1 ?  <h1 className="text-5xl">HISTORY</h1> :menu == 2 ? <h1 className="text-5xl  ">GALLERY</h1>: <h1 className="text-5xl">PENDING</h1> } 
                <div className=" flex h-20 w-full   justify-end bg-transparent  p-4 rounded-md ">
                    <button onClick={()=>{setMenu(2)}} className={`${menu==2 ?' bg-opacity-85 text-gray-100 ':'bg-opacity-15'    }  h-[50px] font-semibold shadow-md  rounded-md bg-blue-700   w-32  m-2`}>GALLERY </button>
                    <button onClick={()=>{setMenu(0)}} className={`${menu==0 ?'bg-opacity-85 text-gray-100':'bg-opacity-15'    }  h-[50px] font-semibold shadow-md  rounded-md bg-blue-700   w-32  m-2`}>PENDINGS </button>
                    <button onClick={()=>{setMenu(1)}} className={`${menu==1 ?'bg-opacity-85 text-gray-100':'bg-opacity-15'    }  h-[50px] font-semibold shadow-md  rounded-md bg-blue-700   w-32  m-2`}>HISTORY </button>
                </div>
                <div className=" block  overflow-scroll justify-center h-[85%]    rounded-md ">
                
                {menu==0 ?<StudentsPending startDate={new Date()} email={activeUser.email} endDate={new Date()} />:''}
                {menu==2 ?<Gallery  />:''}
                {menu==1 ?<StudentHistory  useremail={activeUser.email} />:''}
               <div className="h-[100px]">

               </div>
                </div>
                
            </div>
            <div className={`xl:w-3/12 w-full  ${darkTheme.theme} ${divlign} xl:h-[100%]      border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
            <ChatBox setStudent ={()=>{}} />
                
            </div>
        </div>
    )
}

export default HomePage