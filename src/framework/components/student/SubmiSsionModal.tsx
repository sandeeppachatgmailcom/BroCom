import { Task_model } from "../../../entity/response/task_model";
 
import VoiceRecorder from "../trainer/VoiceRecorder"
import { FaPowerOff } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserEntity_Model } from "../../../entity/response/userModel";
import { login } from "../../ReduxStore/activeUser";
import axiosApi from "../../api/axios";
import { userApi } from "../../../entity/constants/api";
import { ToastContainer, toast } from "react-toastify";
import useGetLogin from "../../../useCases/useGetLogin";
import UploadImageDocument from "../utilComponents/UploadImage";
import UploadPdfDocument from "../utilComponents/pdfUploader";
import GeneralTask from "../trainer/generalTaskSubmisssion";


const SubmiSsionModal = ({ program, ScheduledTaskID, task, onclose }: { program: any, ScheduledTaskID: any, task: Task_model|any, onclose: any, studentSubMission: any }) => {
  useGetLogin('manGrowstudent')
  const [formData, setFormData] = useState<any>({})
  const dispatch = useDispatch()
  const user = useSelector((state:any) => state.activeUser.user)

  useEffect(() => {
    const taskId = task?.taskId;
    const scheduledTask = user?.submission?.[ScheduledTaskID]?.[taskId]?.[0] ? user?.submission?.[ScheduledTaskID]?.[taskId]?.[0] : {};
    setFormData({
      ...task,
      tasklink: scheduledTask ? scheduledTask?.tasklink : ''
    })
  }, [task])
  useEffect(() => {
    // !tempUser.submission ?  tempUser?.submission[ScheduledTaskID] = tempsubmission
  }, [formData])


  const handleTaskChange = (e: any) => {
    console.log(e,'pweeeeeeeeeeeeeeeeee')
    const {value} = e.target;
    setFormData({
      ...formData,
      tasklink: value 
    })
   
  }


  const onSaveClick = async () => {
    const tempsubmission = {
      taskName: task.taskName,
      taskSub: task.taskSub,
      taskType: task.taskType,
      tasklink: formData?.tasklink,
      taskId: task.taskId,
      verifiedBy:task.validateBy,
      submissionDate: task.subMissionDate,
      submittedDate: task.taskDate,
      mark: {
        "1": true,
        "2": true,
        "3": true,
        "4": true,
        "5": true,
        "6": true,
        "7": true,
        "8": true,
        "9": true,
        "10": true,
      },
      documentValidated:false,
      comment: '',
      verified: false
    }

    console.log(tempsubmission,'tempsubmissiontempsubmissiontempsubmission')

    const tempUser: UserEntity_Model | any = JSON.parse(JSON.stringify(user))
    if (!tempUser.submission) { tempUser.submission = {}; }

    if (!tempUser.submission[ScheduledTaskID]) tempUser.submission[ScheduledTaskID] = {}
    if (!tempUser.submission[ScheduledTaskID]['program']) tempUser.submission[ScheduledTaskID]['program'] = program
    if (!tempUser.submission[ScheduledTaskID][task.taskId]) { console.log(tempUser, 'first'), tempUser.submission[ScheduledTaskID][task.taskId] = [] };
    if (task?.taskId == tempsubmission.taskId) tempUser.submission[ScheduledTaskID][task?.taskId][0] = tempsubmission;


    if (tempsubmission?.tasklink?.length) {
      dispatch(login(tempUser))

      const saveuser = await axiosApi.post(userApi.saveBasicProfile, tempUser)
      console.log(saveuser, 'saved result')
      if (saveuser.data.status) {
         toast.success(saveuser.data.message)
      }
    }
    else{
      toast.error('no task to submit')
    }

    
    onclose(false)
  }




  return (
    <div className={`fixed inset-0 z-50 overflow-auto   flex justify-center items-center`}>
      <ToastContainer />
      <div className="modal-overlay fixed w-full h-full   bg-gray-900 opacity-55"></div>

      <div className="     mx-auto rounded shadow-lg z-50  w-6/12 overflow-y-auto">
        <div className="modal-content  py-4 text-left px-6">
          <div className="flex  justify-between items-center pb-3">
            <div className=" justify-center    w-[100%] items-center h-full">
              
              <div className="bg-gray-800 border-8 border-blue-500 border-opacity-10  rounded-b-none rounded-xl p-3 bg-opacity-50 text-white">
              <h1 className='text-2xl text-white' >Submission is on progress !!! </h1>
                <div className="flex  justify-end">
                  <button onClick={() => onclose(false)} > <FaPowerOff className=" h-5 m-3 text-blue-500 w-5" /> </button>
                  <div className="animate-spin -z-10 rounded-full h-10 w-10 border-t-2 absolute  border-b-3 border-white">
                  </div>
                </div>
                <div className="flex items-center"> <h1 className="font-bold text-2xl " >{task.taskName} </h1> <small className="  " >{task.taskType}</small> </div>
                <h1 className="  " >{task.taskSub}</h1>
                <h1 className="font-semibold  " >{task.taskDiscription} </h1>
                <h1 className="  " >{task.taskLink} </h1>
                <h1 className=" " >{task.validateBy}</h1>
              
              </div>


              <div className="flex w-[100%] h-[500px]   rounded-xl">
                {
                   //task?.taskType == "writing" ?<TextEditor  style={{height:'300px'}}  value={task?.description}  />  :
                  //  
                //   task?.taskType == "writing" ? <UploadImageDocument  onChange={handleTaskChange}  onSaveClick={onSaveClick} height = {'100%'} width = {'100%'} changebutton={true} value={formData?.tasklink} /> :
                // task?.taskType == "writing" ? <GeneralTask data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :
                        
                    task?.taskType == "writing" ? <UploadPdfDocument onChange={handleTaskChange}  onSaveClick={onSaveClick} height = {'100%'} width = {'100%'} changebutton={true} value={formData?.tasklink} /> :
                    task?.taskType == "imageDocument" ? <UploadImageDocument  onChange={handleTaskChange}  onSaveClick={onSaveClick} height = {'100%'} width = {'100%'} changebutton={true} value={formData?.tasklink} /> :
                    task?.taskType == "pdfDocument" ? <UploadPdfDocument onChange={handleTaskChange}  onSaveClick={onSaveClick} height = {'100%'} width = {'100%'} changebutton={true} value={formData?.tasklink} /> :
                    task?.taskType == "audioDocument" ?<VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :
                    task?.taskType == "listening" ? <VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :
                    task?.taskType == "reading" ? <VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :
                    task?.taskType == "Speaking" ? <VoiceRecorder data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :
                    task?.taskType == "OneToOne" ? <GeneralTask data={formData} verified={formData?.verified} name='tasklink' onChange={handleTaskChange} onSaveClick={onSaveClick} value={formData?.tasklink} /> :''
                }
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  )
}


export default SubmiSsionModal
