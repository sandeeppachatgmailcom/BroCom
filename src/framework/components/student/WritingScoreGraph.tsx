import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend } from "recharts";
  
const WritingScoreGraph = ({taskType,user}:{taskType:any,user:any}) => {
   
   let markData = []
   
    if(user.submission){
        for (let key in user.submission){
            if(key !='program'){
                let taskCount = 0
                let tempMark = 0;
                for(let task in user.submission[key]){
                    taskCount++
                    if(user.submission[key][task][0]?.verified){
                        for(let mark in user.submission[key][task][0].mark){
                            if(user.submission[key][task][0]?.mark[mark] && user.submission[key][task][0]?.taskType == taskType  ){
                                tempMark +=Number(mark)
                                const marklisttemp={
                                    task: user?.submission[key].program.eventName +'[' +user?.submission[key].program.scheduledDate.toString().split('T')[0]+']' ,
                                    [user?.submission[key][task][0]?.taskType]:tempMark/taskCount,
                                    mark:tempMark/taskCount,
                                    amt:10
                                }
                               
                                markData.push(marklisttemp)
                            }
                           
                        }
                    }
                   
                }
            }
        }
    }
   
    return (
        <div className=" bg-green-200 m-1 rounded-xl bg-opacity-10 p-3 w-full" >
            <div className="w-full flex justify-center ">{taskType}</div>
            <LineChart width={500} height={300} data={markData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="task" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={taskType} stroke="#88ca9d" activeDot={{ r: 8 }} />
                </LineChart>
        </div>
    )
}

export default WritingScoreGraph