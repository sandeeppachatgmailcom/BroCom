import { useSelector } from "react-redux" 
import {  useEffect, useRef, useState } from "react";
import DropdownMenu from "../utilComponents/DropdownMenu";
import axiosApi from "../../api/axios";
import { studentApi, trainerApi, } from "../../../entity/constants/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
import { ToastContainer, toast } from "react-toastify";
import VoiceRecorder from "../trainer/VoiceRecorder";
import VideoMaker from "../trainer/VideoMaker";
import TextEditor from "../trainer/TextEditor";
import { FaExpand } from "react-icons/fa";
import { BiCollapse } from "react-icons/bi";
import useCompareObjects from "../../../useCases/useCompareObjects";


const StudentTask = (props: any) => {
        const [formData, setFormData] = useState<Event_Model & {ScheduledTaskID:string }>()
        const user = useSelector((state:any)=>state.activeUser.user)
        const [initialState, setInitialState] = useState()
        const [category, setCategory] = useState<any>({ })
        const [task, setTask] = useState()
        const longTextRef = useRef()
        const [height,setHeight] = useState('100px')
        useEffect(() => {
                setFormData(props.pending),
                setInitialState(props.pending)
        }, [props.pendings])

        
        useEffect(()=>{
                setTask(props.task)
        },[props.task])

        useEffect(()=>{
                console.log(formData,'forData')
        },[height])
       
         
        const handleChange = (e)=>{
                const {name,value} = e.target;
                console.log(name,value)
                const temp:any = {
                        ...formData,
                        [name]:value
                }
                setFormData(temp)
                 
        } 
        const handleChangeCaterogry = (key,item)=>{
                
                const tempCategory = {
                        ...category,
                      [key]:{
                        ...category[key],
                        [item]:!category[key][item]
                      }
                       
                }
                setCategory(tempCategory)
                const tempFormData = {
                        ...formData,
                        audience:tempCategory
                }
                setFormData(tempFormData)
        }
        useEffect(()=>{
                setCategory(formData?.audience)
                console.log(formData,'formData')
                console.log( formData?.submission[0]?.Speaking)
        },[formData])
        

       
        const handleSaveClick =async  ()=>{
                console.log(initialState,formData,useCompareObjects(initialState,formData),'mic testing ')
                console.log(validateObj.validateObject(initialState,formData),'validateObj.validateObject(initialState,formData)')
                const result =validateObj.validateObject(initialState,formData) 
                if(!result){ const data = await axiosApi.post(trainerApi.saveScheduledTask,formData)
                        setFormData( data.data)    
                }
                else toast.error('no changes to update')
                
                
        }
        const submitTask =async ()=>{
                console.log(formData, formData?.audioLink?.length , formData?.videolink?.length , formData?.WriteTask?.length , 'formData.audioLink && formData.videolink')
                
                
                const submitTask =  {
                        submissionId:'' ,
                        taskid:formData?.taskID ,
                        studentId:user.email,
                        scheduledTaskId:formData?.ScheduledTaskID,
                        WriteTask:formData?.WriteTask   ,
                        Reading:formData?.audioLink,
                        Speaking:formData?.audioLink,
                        deleted:false,
                        active:true
                } 
                console.log(submitTask,'submitTasksubmitTasksubmitTasksubmitTask')
                if(submitTask?.WriteTask?.length ||  submitTask?.audioLink?.length || submitTask?.Speaking?.length){
                        const submit = await axiosApi.post(studentApi.sumbitTask,submitTask)
                   console.log(submit),'submitsubmitsubmitsubmit'
                }
                else{
                        alert('where you are going')
                }
        }
       
         

        const theme = useSelector((state: any) => state.theme.theme)
        return (
                <div className={`${ formData && formData?.ScheduledTaskID? 'bg-blue-300 text-blue-400 shadow-sm shadow-gray-100 bg-opacity-10':''} w-full p-4 h-[${height}] overflow-hidden    hover:shadow-sm hover:shadow-gray-500 border-gray-300 focus:bg-opacity-55 focus:bg-gray-600 border-opacity-45  rounded-xl `} >
                        <div className="justify-start m-2">
                        <ToastContainer/>  
                                <div className="xl:flex flex xl:justify-between justify-between  border-b w-full  border-b-gray-300">
                                        <div className="block md:flex xl:w-4/6 "> 
                                                <div className="block m-2  w-2/6">        
                                                        <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                        <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>
                                                        <h5 className={`${theme.inputtext}`}>{formData?.description} </h5> <br />
                                                </div>
                                                <div className="flex m-2  xl:w-2/6">
                                                        <h5 className=" font-semibold">Start Time <input readOnly onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                        <h5 className=" font-semibold">End Time <input readOnly onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                </div>
                                                <div className="flex w-full xl:w-1/6">
                                                        {task ? <DropdownMenu items={task} name='taskID' onChange={handleChange} value={formData?.taskID} /> : ''}
                                                </div>
                                        </div>
                                        <div className="  w-1/6 md:w-3/6 h-10 flex justify-end border-green-600">
                                              <button onClick={()=>height=='100px'? setHeight('full'):setHeight('100px') }> {height=='100px' ?<FaExpand style={{height:'40px' , width:'40px'}} />  :<BiCollapse   style={{height:'40px' , width:'40px'}} />} </button>  
                                        </div>
                                </div>
                        </div>
                        <div className=" xl:flex  m-2">
                                <div className=" flex flex-col w-full ">
                                        <input name="dayTitle" readOnly  onChange={handleChange}  value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent focus:outline-none focus:border-blue-500`} type="text" placeholder="Activity title" />
                                        <br />
                                        <label     className={`bg-transparent rounded-lg w-full focus:outline-none focus:border-blue-500`} > {formData?.dayDiscription as string} </label>
                                </div>
                                </div>
                                 <div className="justify-start   block w-full   m-2  ">
                                    <h1 className="text-blue-500 font-semibold">{formData?.tasks[0]?.taskType} </h1>
                                       {
                                               formData?.tasks[0]?.taskType == "Writing" ?<TextEditor  style={{height:'300px'}}  value={formData?.description} onChange={handleChange} />  :
                                              // formData?.tasks[0]?.taskType == "Writing" ? <VoiceRecorder name='audioLink' onChange ={handleChange} value={formData?.submission[0]?.Speaking} /> :
                                                formData?.tasks[0]?.taskType == "Reading" ? <VoiceRecorder name='audioLink' onChange ={handleChange} value={formData?.audioLink} /> :
                                                formData?.tasks[0]?.taskType == "Speaking" ? <VideoMaker name='videolink' onChange={handleChange} value = {formData?.videolink} /> :''
                                       }
                                         <div className=" flex w-[100%] rounded-xl">
                                        </div>
                                        <div className=" flex w-full   justify-end">
                                                <button className="button font-semibold   border p-3 rounded-md text-white w-20 bg-gray-500"> RESET </button>
                                                <button onClick={submitTask} className="button font-semibold  border p-3 rounded-md text-white w-20 bg-blue-500"> SUBMIT </button>
                                        </div>  
                                </div>  
                                <div>
                                

                                </div>
                            
                </div>
        )
}

export default StudentTask