import { useSelector } from "react-redux"
import { BsPencilFill } from "react-icons/bs";
import { BsFillFloppyFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import {   useEffect, useRef, useState } from "react"; 
import axiosApi from "../../api/axios";
import { trainerApi, } from "../../../entity/constants/api";
import { Event_Model } from "../../../entity/StateStore/activeUser";
import { SiTicktick } from "react-icons/si";
import { ToastContainer, toast } from "react-toastify";
import { RxDropdownMenu } from "react-icons/rx";
import useCompareObjects from "../../../useCases/useCompareObjects";
import { ImCancelCircle } from "react-icons/im";
import { PendingEventsComponent } from "../../../entity/components/trainer/pendingEvents"; 
import VoiceRecorder from "./VoiceRecorder";
import UploadImageDocument from "../utilComponents/UploadImage";
import UploadPdfDocument from "../utilComponents/pdfUploader";



const PendingEvents = (props: PendingEventsComponent) => {
        const [formData, setFormData] = useState<any | Event_Model & { ScheduledTaskID: string }  >()
        const theme = useSelector((state: any) => state.theme.theme)
        
        const [initialState, setInitialState] = useState<any>()
        const [category, setCategory] = useState<any>({})
      
        const longTextRef = useRef<any>()
        const [height, setHeight] = useState('100px')
        const [mo, setMo] = useState(false)
        const [hovertask, setHoverTask] = useState<any>()
        const validationArray = ['writing','listening','reading','Speaking','OneToOne']
        useEffect(() => {
                console.log(props.pending,'ddd')
                setFormData(props?.pending as Event_Model & { ScheduledTaskID: string }),
                        setInitialState(props?.pending)
        }, [props.pending])


      


        const handleChange = (e:any) => {
                const { name, value } = e.target;

                const temp: any = {
                        ...formData,
                        [name]: value
                }
                setFormData(temp)

        }
        const handleChangeCaterogry = (key: string, item: any) => {

                const tempCategory = {
                        ...category,
                        [key]: {
                                ...category[key],
                                [item]: !category[key][item]
                        }

                }
                setCategory(tempCategory)
                const tempFormData: any = {
                        ...formData,
                        audience: tempCategory
                }
                setFormData(tempFormData)
        }
        useEffect(() => {
                setCategory(formData?.audience)

        }, [formData])

        const updateMark = (mark: any) => {


                const updatedMarks = Object.fromEntries(
                        Object.entries(formData?.mark).map(([key]) => {

                                return [key, key === mark ? true : false]
                        })
                );

                // formData.mark = updatedMarks;
                setFormData({
                        ...formData,

                        mark: updatedMarks
                })
        };


        const handleSaveClick = async () => {
                const result = useCompareObjects(initialState, formData)
                if (!result) {
                        console.log(formData,'formData')
                        const data = await axiosApi.post(trainerApi.saveScheduledTask, formData)

                        setFormData(data.data)
                }
                else toast.error('no changes to update')


        }

        const saveMarktoCollection = async () => {
                const temp = {
                        ScheduledTaskID: formData?.ScheduledTaskID,
                        taskId: formData?.taskId,
                        mark: formData?.mark,
                        comment: formData?.comment,
                        email: formData?.email,
                        verified: true
                }
                const updateResult = await axiosApi.post(trainerApi.updateMarkToCollection, temp)
                if (updateResult.data.status) {
                        setFormData({
                                ...formData,
                                verified: true
                        })
                        toast.success(updateResult.data.message)
                }
                else {
                        toast.error('update failed')
                }

        }
        const verifyuploadedDocs = async (verified:any) => {
                const temp = {
                        ScheduledTaskID: formData?.ScheduledTaskID,
                        taskId: formData?.taskId,
                        mark: formData?.mark,
                        comment: formData?.comment,
                        email: formData?.email,
                        documentValidated: verified
                }
                 
                const updateResult = await axiosApi.post(trainerApi.updateMarkToCollection, temp)
                console.log(updateResult.data,'updateResult.data')

                if (updateResult.data.status) {
                        setFormData({
                                ...formData,
                                documentValidated:updateResult.data.status
                        })
                        toast.success(updateResult.data.message)
                }
                else {
                        toast.error('update failed')
                }

        }

        const buttonColor : Record<number,string>    = {
                0: "bg-blue-400",
                1: "bg-blue-500",
                2: "bg-red-400",
                3: "bg-red-600",
                4: "bg-orange-300",
                5: "bg-orange-500",
                6: "bg-yellow-400",
                7: "bg-yellow-500",
                8: "bg-green-700",
                9: "bg-green-800",
        }


        return (
                <div className="p-1 flex flex-col">
                          <ToastContainer />
                        {formData?.type == 'taskCreation' ?
                                <div className={`${formData && formData?.ScheduledTaskID ? 'bg-blue-600 bg-opacity-10' : ' '}   overflow-hidden w-full  h-[${height}] border  border-opacity-25  block   hover:shadow-sm hover:shadow-gray-500 border-gray-300 focus:bg-opacity-55 focus:bg-gray-600  rounded-xl `} >
                                      
                                        <br />
                                         
                                        <div className=" flex  xl:justify-between justify-between  border-b border-opacity-15 w-full  border-b-gray-300">
                                                <div className="block   items-center xl:flex xl:w-4/6 ">
                                                        <div className="block m-2 w-2/6 ">
                                                                <h5 className={`${theme.inputtext} font-bold`}>{formData?.eventName?.toUpperCase()} </h5>
                                                                <h5 className={`${theme.inputtext}`}>Date :{formData?.scheduledDate?.split('T')[0].split('-').reverse().join('/')} </h5>

                                                        </div>
                                                        <div className="flex m-2  xl:w-3/6">
                                                                <h5 className=" font-semibold">Start Time <input onChange={handleChange} name="startDateTime" value={formData?.startDateTime} className={`rounded bg-transparent focus:outline-none  ${theme.inputtext}`} type="time" /> </h5>
                                                                <h5 className=" font-semibold">End Date <input onChange={handleChange} name="submissionDate" value={formData?.submissionDate?.toString().split('T')[0]} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="date" /> </h5>
                                                                <h5 className=" font-semibold">End Time <input onChange={handleChange} name="endDateTime" value={formData?.endDateTime} className={`rounded   focus:outline-none bg-transparent  ${theme.inputtext}`} type="time" /> </h5>
                                                        </div>
                                                </div>
                                                <div className="md:w-2/6 p-2 flex   justify-end ">

                                                        <button className="h-10 m-1" onClick={() => height == '100px' ? setHeight('100%') : setHeight('100px')}>  <RxDropdownMenu style={{ height: '40px', width: '40px' }} /> </button>
                                                </div>
                                        </div>
 
                                        <div className=" xl:flex  m-2">

                                                <div className="  flex flex-col xl:w-4/6 ">
                                                        <small className={`${theme.inputtext}`}>{formData?.description} </small>
                                                        <input name="dayTitle" onChange={handleChange} value={formData?.dayTitle} className={`rounded w-full  font-bold    bg-transparent  focus:outline-none focus:border-blue-500`} type="text" placeholder=".....Give a title for this schedule" />
                                                        <br />
                                                        <textarea ref={longTextRef} onChange={handleChange} value={formData?.dayDiscription as string} name="dayDiscription" id="myTextarea" className={`h-100    w-full bg-transparent h-32 rounded-lg  focus:outline-none focus:border-blue-500`} placeholder="......Write a detailed discription for this program"  ></textarea>
                                                </div>
                                                {mo ? <div className="xl:w-2/6 bg-blue-700 bg-opacity-25 rounded-xl flex overflow-y-scroll h-[200px] flex-wrap  justify-start border-opacity-25">
                                                        {hovertask ? <div className="p-3 ">
                                                                <h1 className="font-semibold " > Task Detail </h1> <br />
                                                                <h1>Task: {hovertask.taskName}</h1>
                                                                <h1>Discription:  {hovertask.taskDiscription}</h1>
                                                                <h1>Type: {hovertask.taskType}</h1>
                                                                <h1>Validated By {hovertask.validateBy}</h1>

                                                        </div> : ""}

                                                </div>
                                                        :
                                                        <div className="xl:w-2/6  flex overflow-y-scroll h-[200px] flex-wrap  justify-start border-opacity-25">

                                                                {category && Object.keys(category).length ? (
                                                                        Object.keys(category).map((key) => (
                                                                                <div className="flex flex-wrap  " key={key}>
                                                                                        {Object.keys(category[key]).length ? (
                                                                                                Object.keys(category[key]).map((item) => <div onClick={() => { handleChangeCaterogry(key, item) }} className={`${category[key][item] ? 'border-2  text-white  bg-blue-500   ' : 'border-2  border-blue-500 text-blue-500'} w-20 justify-center shadow-sm flex text-center p-2 w-30 h-10 uppercase    m-1 cursor-pointer  rounded-lg`} key={item}>{item}</div>)
                                                                                        ) : (
                                                                                                ''
                                                                                        )}

                                                                                </div>
                                                                        ))
                                                                ) : ''}
                                                        </div>}

                                        </div>
                                        <div className="justify-between text-end flex w-full   m-2  ">
                                                <div className="flex w-4/6 ">
                                                        <div className="flex w-full ">
                                                                {formData?.matchedTasks ? <div>
                                                                        {formData?.matchedTasks?.map((task:any) => {
                                                                                return <button onMouseLeave={() => { setMo(false) }} onMouseOver={() => { setMo(true); setHoverTask(task) }} className={` hover:transform-cpu align-text-bottom overflow-hidden  hover:transition-shadow tra text-center rounded-full h-10 p-2 m-1 border border-gray-400 border-opacity-55 `}>
                                                                                        {task.taskName}
                                                                                        <div> {task.taskDiscription} </div>
                                                                                </button>
                                                                        })}
                                                                </div> : ''}
                                                        </div>
                                                </div>
                                                <div className="flex w-2/6 justify-end">
                                                        <button className="rounded  shadow-sm m-2 p-4 w-30 hover:border hover:border-blue-400  hover:text-blue-500 h-10" ><BsPencilFill />  </button>
                                                        <button onClick={handleSaveClick} className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10 "><BsFillFloppyFill /> </button>
                                                        <button className="rounded  shadow-sm m-2 p-4 w-30  hover:border hover:border-blue-400 hover:text-blue-500 h-10"><MdDelete /> </button>
                                                </div>
                                        </div>
                                </div>
                                : formData?.taskType?.length ? <div className={`  hover:shadow-sm hover:shadow-gray-500 ${formData?.verified ? 'bg-blue-600 bg-opacity-15' : ''} h-[${height}] overflow-hidden border border-opacity-25 border-gray-400  rounded-xl block`}>
                                        <div className="block border-b    ">
                                                <div className="font-semibold rounded-t-md      text-blue-500 justify-between  flex ">
                                                        <div className="flex overflow-hidden">
                                                                <h1 className="m-3" > Program Name: {formData?.eventName}</h1>
                                                                <h1 className="m-3"> Activity Type : {formData?.taskType}</h1>
                                                        </div>
                                                        <div className="flex m-2 " >
                                                                <h1 className="m-1 text-green-500 " > {formData?.type}</h1>
                                                                <div className="md:w-3/6  flex justify-end ">
                                                                        <button onClick={() => height == '100px' ? setHeight('100%') : setHeight('100px')}>  <RxDropdownMenu style={{ height: '40px', width: '40px' }} /> </button>
                                                                </div>
                                                        </div>
                                                </div>
                                                <div className="font-semibold  flex ">
                                                        <h1 className="m-3">Student Name :  {formData?.firstName}</h1>
                                                        <h1 className="m-3">Email: {formData?.email}</h1>
                                                </div>
                                                <h1 className="m-3"> Summary :{formData?.taskSub}</h1>
                                                <h1 className="m-3"> {formData?.dayDiscription}</h1>
                                        </div>
                                        <div className="w-full flex h-[500px] p-2">
                                        { formData?.taskType == 'listening' ? <VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' value={formData?.tasklink} />
                                        : formData?.taskType == 'writing' ? <UploadPdfDocument   height = {'100%'} width = {'100%'}  value={formData?.tasklink} /> 
                                        : formData?.taskType == 'pdfDocument' ? <UploadPdfDocument   height = {'100%'} width = {'100%'}  value={formData?.tasklink} /> 
                                        : formData?.taskType == 'speaking' ? <VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' value={formData?.tasklink} />
                                        : formData?.taskType == 'imageDocument' ? <UploadImageDocument height = {'100%'} width = {'100%'}  value={formData?.tasklink} /> 
                                        
                                        : <div className="m-2"> <textarea readOnly className="h-[300px] focus:outline-none overflow-scroll focus:outline-blue-800 w-full bg-transparent " name="" value={formData?.tasklink} id=""></textarea>
                                                        </div>
                                        }
                                        </div>
                                        <div className=" block xl:flex bg-blue-500 bg-opacity-5 h-20 justify-between">
                                                {validationArray.includes(formData.taskType.trim())?
                                                <div className="xl:w-2/6 block xl:flex items-center   h-20">

                                                        {
                                                                formData?.mark ? Object.keys(formData?.mark).map((key, index: number) => {
                                                                        return <button onClick={( ) => { updateMark(key) }} name={key} className={`${formData?.mark[key] ? 'bg-opacity-1' : 'bg-opacity-15'} m-1 text-white h-10 text-2xl ${buttonColor[index]}  w-10 hover:text-5xl rounded-md`} type="button"> {key} </button>
                                                                }) : ''
                                                        }


                                                </div>: 
                                                 <div className="w-full xl:w-2/6 p-2 flex justify-center items-center overflow-hidden">
                                                          {!formData?.documentValidated? <SiTicktick onClick={()=> verifyuploadedDocs(true)} className=" cursor-pointer  bg-gray-300 bg-opacity-15 h-[50px] w-20 text-green-700   m-2 p-2  text-2xl   hover:text-5xl rounded-md" />:''}
                                                          {!formData?.documentValidated?<ImCancelCircle  onClick={()=> verifyuploadedDocs(false)}  className=" cursor-pointer bg-gray-300 bg-opacity-15 h-[50px] w-20 text-red-700   m-2 p-2  text-2xl   hover:text-5xl rounded-md" />:''}
                                                </div> 
                                                }
                                                <div className="w-full xl:w-5/6 p-2 overflow-hidden">
                                                        <textarea placeholder="Comments" value={formData?.comment} name='comment' onChange={(e) => handleChange(e)} className=" border-blue-800 p-2 rounded-xl border-opacity-55 border h-full focus:outline-none  bg-transparent w-full" id=""></textarea>
                                                </div>
                                                <div className="flex item-center h-full border ">
                                                        {!formData?.verified && validationArray.includes(formData.taskType.trim())  ? <button onClick={saveMarktoCollection} className=" rounded-md text-white  bg-blue-400 p-1 w-32 m-4" type="button">SUBMIT</button> : ''}
                                                </div>
                                        </div>
                                </div> : ''
                        }
                </div>
        )
}

export default PendingEvents