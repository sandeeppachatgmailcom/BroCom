import { useSelector } from "react-redux" 
import {  useEffect,    useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../api/axios";
import { studentApi,    } from "../../../entity/constants/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
import { ToastContainer   } from "react-toastify"; 
import { Task_model } from "../../../entity/response/task_model";
import SubmiSsionModal from "./SubmiSsionModal";
import { UserEntity_Model } from "../../../entity/response/userModel";
import { RxDropdownMenu } from "react-icons/rx"; 
import { FcCollapse } from "react-icons/fc";

const StudentTask = (props: any) => {
        const [formData, setFormData] = useState<Event_Model & {ScheduledTaskID:string }|any>()
        const user :UserEntity_Model = useSelector((state:any)=>state.activeUser.user)
        const [subMission,setSubmission] = useState(false)
        const [task, setTask] = useState<any>()
        const [selectedTask,setSelectedTask] = useState()
        const [height,setHeight] = useState('h-[100px]')
        const [studentSubMission,setStudentSubmission] = useState<any>({})
        const theme = useSelector((state: any) => state.theme.theme)
        useEffect(() => {
                setFormData(props.pending) 
        }, [props.pendings])
        useEffect(()=>{
                setTask(props.task)
        },[props.task])
        useEffect(()=>{
                console.log(formData,'forData')
        },[height])
        useEffect(()=>{
            user.submission? setStudentSubmission(user.submission):setStudentSubmission({})      
        },[user])

        const handleChange = (e:any)=>{
                const {name,value} = e.target;
                console.log(name,value)
                const temp:any = {
                        ...formData,
                        [name]:value
                }
                setFormData(temp)
        } 
       
       
        type IsubmitTask  = {submissionId:string ,
                studentId:string,
                eventId:string | undefined,
                scheduledTaskId:string | undefined,
                matchedTasks:string | undefined|any,
                WriteTask?:string | undefined|any,
                audioLink?:string | undefined|any,
                Speaking?:string | undefined|any,}
        const submitTask =async ()=>{
                const submitTask:IsubmitTask  =   {
                        submissionId:'' ,
                        studentId:user.email,
                        eventId:formData?.eventId ,
                        scheduledTaskId:formData?.ScheduledTaskID,
                        matchedTasks:formData?.matchedTasks
                } 
                
                if(submitTask?.WriteTask?.length ||  submitTask?.audioLink?.length || submitTask?.Speaking?.length){
                        const submit = await axiosApi.post(studentApi.sumbitTask,submitTask)
                   console.log(submit),'submitsubmitsubmitsubmit'
                }
                else{
                        alert('where you are going')
                }
        }
       
         

        
        return (
                <div className={`   ${ formData && formData?.ScheduledTaskID? 'bg-blue-300  text-blue-400  shadow-gray-100 bg-opacity-5':''} w-full  ${height} overflow-hidden   hover:shadow-sm hover:shadow-gray-500   focus:bg-opacity-55 focus:bg-gray-600 border-opacity-45  rounded-xl `} >
                        {subMission? <SubmiSsionModal program = {formData} ScheduledTaskID={formData?.ScheduledTaskID}  studentSubMission={studentSubMission} task={selectedTask} onclose={setSubmission} />:''}
                                <div className="justify-start p-2 m-2">
                                <ToastContainer/>  
                                        <div className="xl:flex flex xl:justify-between justify-between shadow-md p-2  w-full   ">
                                                <div className="block md:flex xl:w-5/6 p-2  "> 
                                                        <div className="block m-2  w-2/6">        
                                                                <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                                <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>
                                                        
                                                        </div>
                                                        <div className="flex m-2  xl:w-2/6">
                                                                <h5 className=" font-semibold">Start Time <input readOnly onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                                <h5 className=" font-semibold">End Date <input readOnly onChange={handleChange} name="endDateTime" value={formData?.submissionDate?.toString().split('T')[0] } className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="date" /> </h5>
                                                                <h5 className=" font-semibold">End Time <input readOnly onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                        </div>
                                                        <div className="flex w-full xl:w-1/6">
                                                                {task ? <DropdownMenu items={task} name='taskID' onChange={handleChange} value={formData?.taskID} /> : ''}
                                                        </div>
                                                </div>
                                                <div className="w-1/6 md:w-3/6 h-100 p-1 flex justify-end border-green-600">
                                                <button onClick={()=>height=='h-[100px]'? setHeight('h-full'):setHeight('h-[100px]') }> {height=='h-[100px]' ?<RxDropdownMenu style={{height:'30px' , width:'30px'}} />  : <FcCollapse    style={{height:'20px' , width:'20px'}} />} </button>  
                                                </div>
                                        </div>
                                </div>
                        
                                <div className="justify-start p-2 m-2  ">                                      
                                        <input name="dayTitle" readOnly  onChange={handleChange}  value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent focus:outline-none focus:border-blue-500`} type="text" placeholder="Activity title" />
                                        <h5 className={`${theme.inputtext}`}>{formData?.description} </h5> <br />
                                        <label     className={`bg-transparent rounded-lg w-full focus:outline-none focus:border-blue-500`} > {formData?.dayDiscription as string} </label>
                                </div>
                                 
                                <div className="block p-2   ">
                                        
                                        {formData?.matchedTasks?.map((task: Task_model|any) => (
                                                        <div
                                                        key={task.taskId} // Added key prop for proper list rendering
                                                        className="p-2 justify-between rounded-md shadow-md m-1 flex"
                                                        >
                                                        <div className="flex">
                                                        <div className="block">
                                                                <div className="flex">
                                                                <h1 className="font-bold">{task.taskName}</h1>
                                                                <h1 className="font-bold"> {studentSubMission?.[formData.ScheduledTaskID]?.[task.taskId] && '['+ (studentSubMission?.[formData.ScheduledTaskID][task.taskId].length ) +'submission ]' }</h1>
                                                                </div>
                                                                <br />
                                                                {task.taskType && <small>{task.taskType}</small>}
                                                        </div>
                                                        <h1 className="font-semibold">{task.taskDiscription}</h1>
                                                        </div>
                                                        <div className="flex p-2">
                                                        {task.possiblePostpone > 0 && (
                                                                <button className="m-1 shadow-lg bg-blue-500 rounded-md p-2 bg-opacity-15">
                                                                POSTPONE
                                                                </button>
                                                        )}
                                                        <button
                                                                onClick={() => {
                                                                setSubmission(true);
                                                        const selectedTask =    studentSubMission &&
                                                                                studentSubMission[formData.ScheduledTaskID] &&
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId] &&
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId].length ?
                                                                                studentSubMission[formData.ScheduledTaskID][task.taskId][0] :
                                                                                task;

                                                                setSelectedTask(selectedTask);
                                                                }}
                                                                className="m-1 shadow-lg bg-blue-500 rounded-md p-2 bg-opacity-15 w-20 font-bold"
                                                        >
                                                                OPEN
                                                        </button>
                                                        </div>
                                                        </div>
                                                        ))}

                                </div>

                                 
                                 
                                <div className=" flex w-full  p-3  justify-end">
                                        <button className="button font-semibold m-1   border p-3 rounded-md text-white w-20 bg-gray-500"> RESET </button>
                                        <button onClick={submitTask} className="button m-1 font-semibold  border p-3 rounded-md text-white w-20 bg-blue-500"> SUBMIT </button>
                                </div> 

                                 
                            
                </div>
        )
}

export default StudentTask