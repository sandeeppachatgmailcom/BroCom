import React, { Suspense, lazy, useEffect} from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
 
//import 'react-calendar/dist/Calendar.css';
 
import ChatBox from "../../framework/components/chatBox/chatBox";
import AdminSubmenu from "../../framework/components/Admin/AdminMenuBar";
import AdminContent from "../../framework/components/Admin/AdminContent";
import ApproveStaff from "../../framework/components/Admin/StaffApproval";
import Events from "../../framework/components/Admin/Events";
import ManageTaskComponent from "../../framework/components/Admin/ManageTaskComponent";
 
 
import useGetLogin from "../../useCases/useGetLogin";
 
const AdminDashBoard = lazy(() => import('../../framework/components/Admin/AdminDashBoard'))

const AdminHomePage: React.FC = () => {
    const darkTheme = useSelector((state: any) => state.theme)
    const selectedSubMenu = useSelector((state: any) => (state.adminSubMenu.menuName))
    useGetLogin('manGrowadmin')
    
    useEffect(() => {
        
    }, [darkTheme])
    const divlign = ''

    return (
        <div className={`xl:flex     sm:block overflow-scroll content-start mx-auto h-[100%] opacity-90 ${darkTheme.theme}`}>

            <div className={`xl:w-2/12 w-full  ${darkTheme.theme + divlign} xl:h-[100%]  border-gray-300   rounded-xl mt-2 p-2`}>
                <div >
                   
                    <Profile />
                </div>
                <div className="flex w-full">
                    {/* <MyCalender /> */}
                </div>
            </div>
            <div className={`block xl:w-7/12 m-1 p-1  h-[100%] w-full overflow-scroll      `}>
                <AdminSubmenu />
                     <div className=" flex mt-2 h-[90%]   overflow-y-scroll ">
                        {selectedSubMenu == 'batches' ? <AdminContent /> :
                            selectedSubMenu == 'approve' ? <ApproveStaff /> :
                                selectedSubMenu == 'programs' ? <Events /> :
                                    selectedSubMenu == 'task' ? <ManageTaskComponent /> :
                                        selectedSubMenu == 'dashBoard' ? <Suspense>   <AdminDashBoard />   </Suspense>: "" 
                                            // selectedSubMenu == 'resume' ?   <Resume/> : "" 
                        }
                    </div>
              
            </div>
            <div className={`xl:w-3/12  h-[100%] w-full ${darkTheme.theme + divlign} bg-blue-800 bg-opacity-5 m-1  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
            <ChatBox setStudent ={()=>{}} />
                {/* <SingleChat nameObj ={{name:'chandhini'}} />  */}

            </div>

        </div>

    )
}


export default AdminHomePage 