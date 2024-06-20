import  { useEffect, useState } from "react"
import DropdownMenu from "../utilComponents/DropdownMenu"
import { enumtaskTypes } from "../../../entity/constants/enum"
import useEnumToArray from "../../../useCases/useEnumToarray"
import {  Switch } from "@mui/material"
import { Task_model } from "../../../entity/response/task_model"
import axiosApi from "../../api/axios"
import { adminApis } from "../../../entity/constants/api"
import Modal from "../../../interfaces/pages/modalOnLoad"
import useGetActiveTask from "../../../useCases/useGetActiveTask"
import useGetActivePrograms from "../../../useCases/useGetActivePrograms"
import { Event_Model } from "../../../entity/response/events"
import useGetDesignation from "../../../useCases/useGetDesignation"
import { DesignationModel } from "../../../entity/response/designation_model"
import { ToastContainer, toast } from "react-toastify"

const Task_Comp = ({selectedTask,onChange,index}:{selectedTask:any,onChange:any,index:any})=>{
    const [postPone,setPostpone] = useState(0)
    const enumTask = useEnumToArray(enumtaskTypes)
    const tempTask:Task_model[]|any = useGetActiveTask()
    const programs:Event_Model[]|any  = useGetActivePrograms()
    const designation :[]|any= useGetDesignation()
    const combDesignation = designation?.map((item:DesignationModel)=>{
        return {id:item.id,name:item.Designation}
    }) 

    const task = tempTask?.map((task:any)=>{
        return  {name:task.taskName,id:task.taskId} 
    })

    const programsList = programs?.map((item:any)=>{
        return  {name:item.eventName,id:item.eventId}
    })

    const blank:Task_model = {
        nextTaskId:'',
        associatedPrograms:[],
        possiblePostpone:0,
        series:false,
        active:false,
        deleted:false,
        repeat:false,
        taskId:'',
        taskDiscription:'',
        taskLink:'',
        taskName:'',
        taskSub:'',
        taskType:'',
        validateBy:'',
        Validation:false,
    }
    
    const [formData,setFormData] = useState<Task_model|any>(blank)
    const tempList = new Set(formData?.associatedPrograms)  
    const[hang,setHang] = useState(false)
    useEffect(()=>{
        setFormData(selectedTask)
        setPostpone(formData?.possiblePostpone)
    },[selectedTask])
    
    
    
    



    
    const handleChange = (e:any)=>{
        let {name,value} = e.target
        if(name=='active'){
            e.target.checked? value=true:value=false
        }
        else if(name=='repeat'){            e.target.checked? value=true:value=false
        } 
        else if(name=='Validation'){
            e.target.checked? value=true:value=false
        }
        else if(name=='series'){
            e.target.checked? value=true:value=false
        }
        setFormData({
            ...formData,
            [name]:value
        })
    }
     

    const validateTask = (task:Task_model|any)=>{
        console.log(task.validateBy,task )
        const DoesNotIncludes = ['','Select','select','validateBy',"nextTastId"]
            if(task.Validation && DoesNotIncludes.includes(task?.validateBy.trim() as string) ) return {message:'Assign validator designation' ,status:false} 
            if(task.series && DoesNotIncludes.includes(task?.nextTaskId.trim() as string) ) return {message:'Assign next connected Task' ,status:false}
            if(task.taskType && DoesNotIncludes.includes(task?.taskType.trim() as string) ) return {message:'Assign valid task type' ,status:false}
            
            else return {status:true}
    }
    
    const saveTask =async ()=>{
        const isValid = validateTask(formData)
        console.log(isValid)
        if(isValid.status)
            {
                setHang(true) 
                const save =await axiosApi.post(adminApis.createTask,formData)
                setHang(false)
                setFormData(save.data)
                toast.success(isValid.message)
                onChange(index,formData)
            }
            else{
                toast.error(isValid.message)
            }
                
        
    } 
    const handleRecurringProgramList = (programid:any)=>{
         
        if(tempList.has(programid)) tempList.delete(programid)
        else tempList.add(programid) 
            setFormData({
                ...formData,
                associatedPrograms:[...tempList] 
            })
        
    }
    useEffect(()=>{
        setFormData(blank)
    },[])

    const handleSingleTermProgramList = (programid:any)=>{
         
        if(tempList.has(programid)) tempList.delete(programid)
        else {
            tempList.clear()
            tempList.add(programid) 
            }
            setFormData({
                ...formData,
                associatedPrograms:[...tempList] 
            })
        
    }

    return(
    <div className="w-full block      ">
        {hang?<Modal/>:''}
        <ToastContainer/>
        <div className=" flex p-1 m-2  rounded-md shadow-md  w-full ">
            <div className=" block p-1 m-2  rounded-md shadow-md  xl:w-3/6 ">
                <div className="flex bg-opacity-5 items-center h-10 m-2 ">
                    <h1 className="w-2/6" >TASKNAME </h1> 
                    <input type="text" name="taskName" value={formData?.taskName }  onChange={handleChange} className="focus:outline-none focus:outline-blue-600 w-4/6 bg-transparent  h-10" />   
                </div>
                <div className="flex bg-opacity-5 items-center h-10 m-2 ">
                    <h1 className="w-2/6" >TYPE </h1> 
                     <div className="flex w-4/6">{enumTask? <DropdownMenu name='taskType' value={formData?.taskType} onChange={handleChange} items={enumTask} />:''} </div>
                </div>
                <div className="flex bg-opacity-5 items-center h-10 m-2 ">
                    <h1 className="w-2/6">RECURRING   </h1> 
                    <div className='justify-between  flex align-middle overflow-hidden  items-center  '>
                                <Switch name="repeat" checked={formData?.repeat} onChange={(e)=>handleChange(e)} />
                            </div>

                </div>
                <div className="flex bg-opacity-5  items-center h-10 m-2 ">
                    <h1 className="w-2/6">ACTIVE </h1> 
                    <div className='justify-between  flex align-middle overflow-hidden  items-center  '>
                                <Switch name="active" checked={formData?.active} onChange={(e)=>handleChange(e)} />
                            </div>

                </div>
                <div className="block bg-opacity-5 items-center   m-2 ">
                        <div className="flex bg-opacity-5 items-center ">
                            <h1 className="w-2/6">VALIDATION </h1> 
                            <div className='justify-between  flex align-middle overflow-hidden  items-center  '>
                                <Switch name="Validation" checked={formData?.Validation} onChange={(e)=>handleChange(e)} />
                            </div> 
                        </div>
                        <div>
                            {formData?.Validation?
                            (<div className="flex items-center w-full"> 
                            <h1 className="w-1/2"> VALIDATE BY </h1>
                            {combDesignation? <DropdownMenu name='validateBy' value={formData?.validateBy ?   formData?.validateBy   : 'Select'} onChange={handleChange} items={combDesignation} /> :''  } 
                            </div>) :''}
                        </div>
                    
                </div>
                
                <div className="block bg-opacity-5  m-2 ">
                    <div className="flex bg-opacity-5 items-center  ">
                        <h1 className="w-2/6">SERIES  </h1> 
                        <div className='justify-between  flex align-middle overflow-hidden  items-center  '>
                                    <Switch name="series" checked={formData?.series} onChange={(e)=>handleChange(e)} />
                        </div>
                    </div>
                    <div>
                    {formData?.series?
                    (<div className="flex items-center w-full"> 
                        <h1 className="w-1/2"> NEXT TASK</h1>
                        <DropdownMenu name='nextTaskId' value={formData?.nextTaskId} onChange={handleChange} items={task} />
                    </div>) :''} 
                    </div>
            
                </div>
                <div className="flex bg-opacity-5  m-2 ">
                    <h1 className="w-2/6" >POSSIBLE POSTPONE</h1> 
                    <div className="flex ">
                    <button onClick={()=>postPone>0?setPostpone(postPone-1):''} className="w-10 border font-bold h-10 bg-gray-400 bg-opacity-85 p-1 text-white rounded-md " > -</button>
                    <button onChange={handleChange} name="possiblePostpone" className="w-10 border font-bold h-10 bg-blue-400 bg-opacity-15 p-1 text-white rounded-md " value={postPone?postPone:0} > {postPone?postPone:0}</button>
                    <button onClick={()=>setPostpone(postPone+1)} className="w-10 border font-bold h-10 bg-gray-400 bg-opacity-85 p-1 text-white rounded-md " > + </button>
                    </div>
                </div>
                
            </div>
            <div className=" block p-1 m-2  rounded-md shadow-md  xl:w-3/6 ">
            <div className=" block bg-opacity-5    m-2 ">
                    <h1 className="w-2/6" >ASSOCIATED PROGRAMS  </h1> 
                    {formData?.repeat ?<div className="flex flex-wrap  w-full overflow-scroll    rounded-md shadow-inner">
                        {programsList?.map((program :any )=>{
                            
                            return <div onClick={()=>handleRecurringProgramList(program.id)}  className={`${tempList.has(program.id)?'bg-blue-400 font-semibold bg-opacity-55  text-white':'text-blue-500 bg-gray-500 bg-opacity-15   border-blue-500' }   cursor-pointer    m-1 rounded-full p-3 text-center `} >{program.name?.toUpperCase()}</div> 
                        })}   
                    </div> :<div className="flex flex-wrap  overflow-scroll   rounded-md shadow-inner">
                        {programsList?.map((program:any )=>{
                            
                            return <div onClick={()=>handleSingleTermProgramList(program.id)}  className={`${tempList.has(program.id)?'bg-blue-400 font-semibold bg-opacity-55  text-white':'text-blue-500 bg-gray-500 bg-opacity-15   ' }    cursor-pointer    m-1 rounded-full p-3 text-center `} >{program.name?.toUpperCase()}</div> 
                        })}   
                    </div>} 
            
                </div>
            </div>
        </div>
            
        <div className="  block p-1 m-2  rounded-md shadow-md  w-full ">
            <div className="block align-middle text-center w-full  ">
                    <h1 className="w-2/6  h-10 text-start font-semibold " >LINK </h1> 
                    <input type="text" name="taskLink" onChange={handleChange}  value={formData?.taskLink} className="bg-transparent  border border-gray-500 border-opacity-15 focus:outline-none focus:outline-blue-500 w-full h-10" />   
                </div>
                <div className="block  w-full text-center  ">
                    <h1 className="w-2/6  h-10 text-start font-semibold" >SUMMARY </h1> 
                    <textarea  name="taskSub" value={formData?.taskSub}  onChange={handleChange} className=" focus:outline-none focus:outline-blue-500    border border-gray-500 border-opacity-15   bg-transparent w-full h-[50px]" />   
                </div>
                <div className="block  text-center  ">
                    <h1 className="w-2/6  h-10 text-start font-semibold" >DISCRIPTION</h1> 
                    <textarea  name="taskDiscription"  onChange={handleChange} value={formData?.taskDiscription} className=" focus:outline-none focus:outline-blue-500  border border-gray-500 border-opacity-15  bg-transparent w-full h-[200px]" />   
                </div>
                {formData?.taskId? <button onClick={saveTask} className="h-10 bg-blue-400 w-32 m-1 rounded-md text-center font-semibold text-white  ">UPDATE </button>:''}
            {formData?.taskId?  <button onClick={()=>setFormData(blank)} className="h-10 m-1 bg-blue-400 w-40 rounded-md text-center font-semibold text-white  ">RESET & CREATE</button>
              :<button onClick={saveTask} className="h-10 m-1 bg-blue-400 w-32 rounded-md text-center font-semibold text-white  ">CREATE</button>
            }
            </div>
    </div>
    )
}

Task_Comp.prototype = {
    
}

export  default Task_Comp