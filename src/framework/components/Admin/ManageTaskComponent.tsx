import useGetActiveTask from "../../../useCases/useGetActiveTask"
import Task_Comp from "./TaskComponent"
import { Task_model } from "../../../entity/response/task_model"
import { useEffect, useState } from "react"


const ManageTaskComponent :React.FC = ()=>{
    let tempTask:any  = useGetActiveTask()
    const [taskList,setTaskList] = useState([])
    const [page,setPage] = useState(0)
    const [skip,setSkipt] = useState(0)
    const [menuIndex,setMenuIndex] = useState(0)
    const [selectItem,setSelectItem] = useState<any>()
    const content = 5
   
    useEffect(()=>{
        setTaskList(tempTask)
    },[tempTask])
    
    useEffect(()=>{
        setSkipt( page*content)
       
    },[page])
    
    const handlePageChange = (e:any)=>{
        setPage(e.target.value)
    }
    const updateTaskList = (index:number,task:object)=>{
        const temp:any = [...taskList]
        temp[index]=task
        setTaskList(temp)
    }

    return(
      <div className="xl:flex block  shadow-md  w-full p-1">
        <div className="block border-e-2  border-gray-600 border-opacity-15 m-1 p-1  w-full xl:w-1/6">
            <div className="flex flex-col items-stretch justify-center w-full p-1 " >
            {taskList && taskList
            .slice(skip, (content*(page+1))+1)
            .map((task: Task_model,index:number) => (
                 <button onClick={(e:any)=>{setSelectItem(task);setMenuIndex(e.target.value)}} value={index} className={`  bg-blue-500 bg-opacity-15 shadow-md  h-10 rounded-md m-1 w-full font-semibold`}> {task.taskName?.toUpperCase()} </button> ))
            
            } 
            </div>

            <div className="flex  shadow-md end-0  ">
            {taskList  && Array.from({ length: Math.ceil(taskList.length / content) }, (_, index) => (
                <button className="border  rounded-md shadow-md m-1 h-10 w-10 " value={index}  key={index} onClick={(e) => handlePageChange(e)}>
                {index + 1}
                </button>
            ))}
            </div>

        </div>
        <div className="flex    w-full  xl:w-5/6">
            <Task_Comp selectedTask={selectItem} index={menuIndex} onChange={updateTaskList}  />
        </div>

      </div>

    )
}


export default ManageTaskComponent