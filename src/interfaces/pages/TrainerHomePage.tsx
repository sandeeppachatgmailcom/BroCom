import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Profile from "../../framework/components/utilComponents/profile";
import Calendar from 'react-calendar'
//import 'react-calendar/dist/Calendar.css';
import Typing from "../../framework/components/task/TaskTyping";
import AudioTask from "../../framework/components/task/audioTask";
import ChatBox from "../../framework/components/chatBox/chatBox";
import SingleChat from "../../framework/components/header/SingleChat";
import TrainerMenuPanel from "../../framework/components/trainer/TrainerMenuPanel";
import PendingEvents from "../../framework/components/trainer/PendingEvents";
import axiosApi from "../../api/axios";
import { trainerApi } from "../../api/api";

const TrainerHomePage = () => {
    const darkTheme = useSelector((state:any) => state.theme) 
    const user = useSelector((state:any)=>state.activeUser.user)
    const [pending,setPending] = useState([])
    const data = {email:user.email,
        startDate: new Date(),
        endDate: '2024-05-30' 
    }
    const [value, onChange] = useState(new Date());
    useEffect(() => {
        console.log(darkTheme.theme)
    }, [darkTheme])
    const divlign = '   rounded  mt-1 '
    const getPending = async ()=>{
        const pending = await axiosApi.post(trainerApi.getPending,data)
        console.log(pending.data)
        setPending(pending.data)
    }
    
    useEffect(()=>{
        getPending()
    },[])





    return (
        <div  className={`xl:flex md:flex lg:flex sm:block content-start mx-auto h-100 opacity-90 ${darkTheme.theme}`}>

            <div className={`xl:w-1/6 md:w-2/6 sm:w-full  ${darkTheme.theme + divlign} bg-opacity-30  border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`}>
                <div >
                <h6 className="font-bold text-2xl text-orange-500 ">Trainer</h6>
                    <Profile />
                </div>
                <div className="bg-transparent ">
                      <Calendar defaultView= 'month'  value={value} />  
                     
                </div>
            </div>
            <div   className={`block h-full w-full overflow-hidden   ${darkTheme.theme} ${divlign} `}>
                <div   className={`block w-full bg-transparent ` }>
                     <TrainerMenuPanel/> 
                     </div>   
                <div   style={{ msOverflowStyle: 'none',WebkitOverflowScrolling: undefined }} className= {`block  h-full w-full sm:w-full overflow-y-scroll   md:w-full lg:w-3/4 xl:w-full xl:m-1 xl:mt-2     ${darkTheme.theme} ${divlign} `}>
                {pending && pending.map((pending:any)=>{
                    return <div className="    p-1     ">
                        <PendingEvents   pending = {pending} />
                    </div>
                })}

                
            </div>
                
                
                
                <Typing/>
                <AudioTask/>
            </div>
            <div className={`xl:w-1/6 md:w-2/6 sm:w-full ${darkTheme.theme + divlign} border border-gray-300 border-opacity-45 rounded-xl mt-2 p-2`} >
                <ChatBox/>
                <SingleChat nameObj ={{name:'chandhini'}}/>  

            </div>

        </div>
    )
}

export default TrainerHomePage