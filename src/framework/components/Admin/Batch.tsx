import { useSelector } from "react-redux"
import DropdownMenu from "../utilComponents/DropdownMenu";  
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import {  useEffect, useState } from "react";
import { BatchComponent } from "../../../entity/response/Batch";
import { FaSave } from "react-icons/fa";
import { MdCancelScheduleSend } from "react-icons/md";
import axiosApi from "../../api/axios";
import { MdAddHome } from "react-icons/md";
import { adminApis, utilityApis } from "../../../entity/constants/api";
import { ToastContainer, toast } from "react-toastify";
import ButtonSwitch from "../utilComponents/ButtonSwitch";
type props ={
    activebatchs:BatchComponent
    setActiveBatch:any 
}


const Batch = (props:props) => {
    
    const darkTheme = useSelector((state:any) => state.theme.theme)
    const darkText = useSelector((state:any) => state.theme.inputtext)
    const blank = {BatchType:"",active:false,batchId:"",batchName:"",cordinator:"",deleted:false,edited:false,location:"",maxCapacity:0,trainer:"",venue:""}
    const [venue,setVenue] = useState()
    const [trainers,setTrainers] = useState()
    const getVenues = async()=>{
         const venues =await axiosApi.get(utilityApis.listAllVenues)
         console.log(venues.data,'data from front')
         const data =JSON.parse(JSON.stringify(venues.data)).map((item:any)=>{
            return{ name:item.venueName,id:item.venueId}
         })
         setVenue(data)
    }
    const getTrainers =async ()=>{
        const trainers = await axiosApi.get(utilityApis.listActiveTrainers)
        const data =JSON.parse(JSON.stringify(trainers.data)).map((item:any)=>{
            return{ name:item.firstName,id:item.email}
         })
        console.log(data,'trainers')
        setTrainers(data)
    }
    const getStudents =async ()=>{
        const trainers = await axiosApi.get(utilityApis.listActiveTrainers)
        const data =JSON.parse(JSON.stringify(trainers.data)).map((item:any)=>{
            return{ name:item.firstName,id:item.email}
         })
        console.log(data,'trainers')
        setTrainers(data)
    }
    const saveBatch =async ()=> {
        console.log(activebatch,'activebatch')
        const result =await axiosApi.post(adminApis.createBatch,activebatch)
        console.log(result.data,'batch')
        if(!result.data.status) toast.error(result.data.message)
        else{
            props.setActiveBatch(activebatch)
            toast.success(result.data.message)
    }    
    }


    useEffect(()=>{
        getVenues() 
        getTrainers()
        getStudents()
    },[])
    const [activebatch, setActivebatch] = useState <BatchComponent> (props.activebatchs)
   
    const handleChange = (e:any): void => {
        let { name , value } = e.target;
        console.log( name , value,'keypress found ')
        setActivebatch({
          ...activebatch,
          [name]: value
        });
      };



      useEffect(()=>{
        console.log(activebatch,'activeBatch')
      },[activebatch])

    useEffect(() => {
        setActivebatch(props.activebatchs)
    }, [props])

    return (
        <div className='xl:flex  w-full h-[100%] rounded rounded-e-xl   md:block     '>
            {
                
                    <>
                        <div className={`xl:w-3/6    sm:w-full md:w-full lg:w-full  block ${darkTheme} m-1 rounded-xl  justify-between   `}>
                
                        <ToastContainer/>
                            <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                                <label className=' w-2/4' htmlFor="">BATCH NAME </label>
                                
                                <input placeholder="batch Name" className={`w-2/4 uppercase bg-transparent  flex  ${darkText}`} onChange={handleChange}  type="text" name="batchName" value={activebatch.batchName} id="" />
                            </div>
                            <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                                <label className=' w-2/4' htmlFor="">START DATE </label>
                                <input className={`w-2/4  ${darkText}`} onChange={handleChange}  type="date" name="startDate" value={activebatch?.startDate} id="" />
                            </div>
                            <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                                <label className=' w-2/4' htmlFor="">END DATE  </label>
                                <input className={`w-2/4  ${darkText}`} onClick={() => { }} onChange={handleChange}  type="date" name="endDate" value={activebatch.endDate} id="" />
                            </div>
                            <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                                <label className=' w-2/4' htmlFor="">MAX STUDENT </label>
                                <input className={`w-2/4  ${darkText}`} onClick={() => { }} onChange={handleChange}  type="number" name="maxCapacity" value={activebatch.maxCapacity} id="" />
                            </div>
                            <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                                <label className=' w-2/4' htmlFor="">LOCATION </label>
                                <div className='justify-between align-middle w-2/4  '>
                                    {venue? <DropdownMenu name='location' value={activebatch?.location  ? activebatch?.location : ''} onChange={handleChange} items={venue} />:''}
                                </div>
                            </div>

                        </div>
                    </>  
            }
            <div className={`xl:w-3/6  sm:w-full md:w-full lg:w-full block ${darkTheme} m-1 rounded-xl  justify-between   `}>
                <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                    <label className=' w-2/4' htmlFor="">BATH TYPE </label>
                    <div className='justify-between align-middle w-2/4  '>
                        <DropdownMenu name='BatchType' onChange={handleChange}  value={activebatch.BatchType ? activebatch?.BatchType : 'Remote'}  items={[{ name: 'Remote', id: 'TY0001' }, { name: 'BroCamp', id: 'TR0002' }]} />
                    </div>
                </div>
                <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                    <label className=' w-2/4' htmlFor="">ACTIVE </label>
                    <div className='w-2/4 justify-start flex  align-middle'> 
                        
                        <ButtonSwitch name ='active'  value={activebatch.active  } onChange={handleChange}  />
                        </div>
                </div>
                 
                <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                    <label className=' w-2/4' htmlFor="">TRAINER </label>
                    <div className='w-2/4 m-2 justify-between align-middle '>
                                    {trainers?  <DropdownMenu name='trainer' onChange={handleChange} value={activebatch.trainer ? activebatch.trainer : 'Select'}   items={trainers} />:''}
                    </div>
                </div>
                <div className='w-full flex m-1 h-[60px] p-2 items-center justify-between '>
                    <label className=' w-2/4' htmlFor="">CORDINATOR </label>
                    <div className='w-2/4 m-2 justify-between align-middle '>
                    {trainers? <DropdownMenu name='cordinator' onChange={handleChange}  value={activebatch.cordinator} items={trainers} />:''}
                    </div>
                </div>
                <div className="flex m-1 justify-end">
                         <button onClick={()=>{setActivebatch(blank);console.log('hello')}} className="flex m-1 border  w-1/6 shadow-md shadow-blue-200 h-10 bg-blue-500 items-center justify-between p-2 text-white rounded-lg ">,                           <MdAddHome  />  Create  
                        </button>
                        <button onClick={()=>{saveBatch()}} className="flex m-1 border  w-1/6 shadow-md shadow-blue-200 h-10 bg-blue-500 items-center justify-between p-2 text-white rounded-lg ">
                        <FaSave />  Save 
                        </button> 
                        
                        
                        <button className="flex m-1 border w-1/6 shadow-md shadow-gray-200 h-10 bg-gray-600 items-center justify-between p-2 text-white rounded-lg ">
                        <MdCancelScheduleSend />  Cancel 
                        </button>
                        </div>
            </div>
        </div>
    )
}

export default Batch