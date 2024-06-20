import { useEffect, useState } from 'react';
import { StudentsPending_Component } from '../../../entity/components/students/studentsPending';
import { useSelector } from 'react-redux';
import axiosApi from '../../api/axios';
import { studentApi } from '../../../entity/constants/api';
import StudentTask from './StudentTask';
 


  




const StudentsPending:StudentsPending_Component = ( ) => {
   const [formData,setFormData] = useState() 
   const user = useSelector((state:any) => state.activeUser.user)
   const endDate = new Date()
   endDate.setDate(endDate.getDate()+30)  
   
   
    const fetchTask =async  ()=>{
      const data = {
        designation:user.designation ,
        email:user.email,
        startDate: new Date().toISOString() ,
        endDate: endDate.toISOString(),
        batch:user.batchId
       }
      console.log(data,'data to fetch')
        const task = await axiosApi.post(studentApi.getStudentsTask,data)
        if (task.data){
            console.log(task.data,'task data ')
            setFormData(task.data)
        }
    }
    useEffect(()=>{
        fetchTask();
    },[user])
   return (
    <div className=" w-full   rounded-lg  h-[100%] bg-opacity-10 px-2 py-2 w-100 ">
      {formData && formData.map((item:any)=>{
        return (<div key={item.ScheduledTaskID} className='m-2 rounded-lg '>
                <StudentTask pending = {item} />
        </div>)
      })}
    </div>
  );
};

export default StudentsPending;
 