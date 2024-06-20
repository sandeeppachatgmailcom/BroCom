import { useEffect, useState } from "react"
import { Event_Model } from "../../../entity/response/events"
import { useSelector } from "react-redux"
import DropdownMenu from "../utilComponents/DropdownMenu"
import axiosApi from "../../api/axios"
import { adminApis    } from "../../../entity/constants/api"
import Switch from '@mui/material/Switch';
import { audienceType,   repeat } from "../../../entity/constants/enum"
import { ToastContainer, toast } from "react-toastify"
import useCompareObjects from "../../../useCases/useCompareObjects"
import { EventBody_Component } from "../../../entity/components/admin/eventBodyComponent"
import useGetVenue from "../../../useCases/useGetVenue"
import useEnumToArray from "../../../useCases/useEnumToarray"
import useGetDesignation from "../../../useCases/useGetDesignation"
import { DesignationModel } from "../../../entity/response/designation_model"
   



const EventBody =({event,onChange }:EventBody_Component)=>{
    const [formData,setFormData] = useState<Event_Model|void|any>()
    const venue = useGetVenue()  
    const dark = useSelector((state:any)=>state.theme.theme)
    const darkText = useSelector((state:any)=>state.theme.inputtext)    
    const enumAudienceType = useEnumToArray(audienceType)
    const enumRepeat =  useEnumToArray(repeat)
    const [initailState ,setInitialState] = useState<Event_Model|void>()
     
    const compareObject = useCompareObjects(initailState,formData)
    const designation :any= useGetDesignation()
    const combDesignation = designation?.map((item:DesignationModel)=>{
        return {id:item.id,name:item.Designation}
    }) 
    
    

   const handleSaveProgram =async ()=>{
    console.log(formData,'formData')
    
    if (compareObject){
            toast.error('no changes to update')
        }
        else {
            const save = await axiosApi.post(adminApis.createEvent,formData)
            console.log(save.data)
            
            if(save.data.status){
                setFormData(save.data)
                toast.success(save.data.message)
                onChange(formData)
            }
            else{
                toast.error(save.data.message)
            }
        }
   }


    
    useEffect(()=>{
        setFormData({...event as Event_Model})
        setInitialState({...event as Event_Model})
    },[event])

    const handleChange = (e:any)=>{
        let {name,value} = e.target
        if(name=='prority'){
            e.target.checked? value='high':value='low'
        }
        if(name=='active'){
            e.target.checked? value=true:value=false
        }
        if(name=='review'){
            e.target.checked? value=true:value=false
        }
        if(name == 'timeFixed')
            e.target.checked ?value = true:value=false
        console.log(e.target,'e.target',name,value, e.target.checked)
        setFormData({
            ...formData,
            [name]:value
        })
    }

    const handleNewCreation = ()=>{
      
        setFormData({})
       
    }

    
    return(
        <div className="block  xl:flex w-full  rounded  overflow-scroll    h-[100%] p-1     ">
            <ToastContainer/>   
            <div className=" flex flex-col w-full xl:w-1/2 h-[100%] ">
                <div className='w-full flex m-1   p-2 items-center justify-between   h-[70px]'>
                    <label className=' w-2/4 h-full align-middle items-center ' htmlFor="">Event Name </label>
                    <div className={`w-2/4 uppercase  border-none h-full flex  `}>
                        <input name="eventName"  onChange={handleChange} className={` ${darkText} bg-transparent focus:outline-none focus:outline-blue-500   w-full   rounded    `} placeholder="Event name"  value={formData?.eventName?formData?.eventName:''}   />                   
                    </div>
                </div>

                <div className='w-full flex m-1   p-2 items-center justify-between   h-100'>
                    <label className=' w-2/4 h-100' htmlFor="">Designation (inCharge)  </label>
                    <div className='justify-between align-middle w-2/4  '>
                          {combDesignation? <DropdownMenu name='designation' value={formData?.designation  ? formData?.designation : ''} onChange={handleChange} items={combDesignation} />:''}  
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Repeat  </label>
                    <div className={` justify-between align-middle w-2/4`}>
                        {enumRepeat? <DropdownMenu name='repeat' value={formData?.repeat  ? formData?.repeat : ''} onChange={handleChange} items={enumRepeat} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Location  </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {venue? <DropdownMenu name='location' value={formData?.location  ? formData?.location : ''} onChange={handleChange} items={venue} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Audiance    </label>
                    <div className='justify-between align-middle w-2/4  '>
                        {venue? <DropdownMenu name='audienceType' value={formData?.audienceType  ? formData?.audienceType : ''} onChange={handleChange} items={enumAudienceType} />:''}
                    </div>
                </div>
                <div className="w-full flex m-1   p-2 items-center justify-between   h-100 ">
                        <label className=' w-2/4 h-100' htmlFor="">Review    </label>
                        <div className='justify-between flex align-middle w-2/4 items-center '>
                            <Switch name="review" checked={formData?.review==true?true:false}  onChange={(e)=>handleChange(e)} />
                        </div> 
                    </div>       
            </div>
            <div className="  flex flex-col w-full xl:w-1/2   ">
             
                <div className='w-full xl:block flex m-1    p-2 items-center justify-between   h-100 '>
                    <div className="xl:flex block items-center">
                        <label className=' w-2/4 h-100' htmlFor="">Fixed Time  </label>
                        <div className='justify-between  flex align-middle overflow-hidden  items-center  '>
                            NO
                            <Switch name="timeFixed" checked={formData?.timeFixed ?true:false} onChange={(e)=>handleChange(e)} />
                            YES
                        </div>

                    </div>
                   
                    <div className="xl:flex block items-center">
                        <label className=' w-2/4 h-100' htmlFor="">priority    </label>
                        <div className='justify-between flex   align-middle w-2/4 items-center '>
                            LOW 
                            <Switch name="prority"  checked={formData?.prority=='high'?true:false}  onChange={(e)=>handleChange(e)} />
                            HIGH    
                            </div>
                    </div>
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <label className=' w-2/4 h-100' htmlFor="">Start Time  </label>
                    <input className={`w-2/4 uppercase bg-opacity-0 border-none h-100 flex  ${darkText}`} onChange={handleChange}  type="time" name="startDateTime" value={formData?.startDateTime as string} id="" />
                    <label className=' w-2/4 h-100' htmlFor="">End Time  </label>
                    <input className={`w-2/4 uppercase  border-none bg-opacity-0  h-100 flex  ${darkText}`} onChange={handleChange}  type="time" name="endDateTime" value={formData?.endDateTime as string } id="" />
                </div>
                <div className='w-full flex m-1   p-2 items-center justify-between   h-100 '>
                    <div className="flex xl:w-2/4 items-center ">
                        <label className=' w-2/4 h-100' htmlFor="">Active    </label>
                        <div className='justify-between flex align-middle w-2/4 items-center '>
                            <Switch name="active" checked={formData?.active} onChange={(e)=>handleChange(e)} />
                        </div> 
                    </div>       
                    { formData?.active? (
                    <div className="flex xl:w-2/4 items-center   justify-between">
                        <label className=' w-2/4 h-full align-middle items-center ' htmlFor="">Start Date </label>
                        <div className={`w-2/4 uppercase  border-none h-full flex  ${darkText}`}>
                            <input  type="date" onChange={handleChange} name="startDate"  className={`${dark} w-full bg-opacity-15    rounded border-gray-300 `} value={formData?.startDate?.split('T')[0] } id="outlined-basic"    />                   
                        </div>
                    </div>) :''}        
                </div>
                
               
                
                <div className='w-full block m-1   p-2 items-center justify-between  '>
                    <label className=' w-full h-full align-middle items-center ' htmlFor="">Summary </label>
                    <div className={`w-full h-100 border-none h-full flex `}>
                        <textarea placeholder="discribe the summary about the program " onChange={handleChange} className={`  ${darkText} bg-transparent focus:outline-none focus:outline-blue-500 border border-opacity-10 w-full     rounded  `} name="description" value={formData?.description}    />                   
                    </div>
                </div>

                <div className='w-full flex flex-wrap m-1    p-2 items-center justify-end   h-[70px]'>
                <button onClick={handleNewCreation} className=" h-10 w-1/6 shadow-sm m-1 font-semibold rounded-md items-center bg-green-800"> NEW </button>
                    <button onClick={handleSaveProgram} className=" h-10 w-1/6 shadow-sm m-1 rounded-md items-center bg-blue-300 font-semibold"> SAVE </button>
                    <button className=" h-10 w-1/6 shadow-sm m-1 rounded-md items-center bg-gray-400 font-semibold "> CANCEL </button>
                </div>

            </div>
        </div>
    )
}

export default EventBody