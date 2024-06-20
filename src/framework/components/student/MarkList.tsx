import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend } from "recharts";
 
  
const MarkList = ({user}:{user:any}) => {
   //const user = useSelector((state:any)=>state.activeUser.user)
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
                            if(user.submission[key][task][0]?.mark[mark]){
                                tempMark +=Number(mark)
                            }
                            
                        }
                    }
                }
                //let totalMark = taskCount*10;
                const marklisttemp={
                  [key]:user?.submission[key]?.program?.eventName,
                    mark:tempMark/taskCount,
                    amt:10
                }
               
                markData.push(marklisttemp)
            }
        }
    }
   
  
    return (
        <div className=" bg-green-200 rounded-xl bg-opacity-10 p-3 m-1 w-full" >
          <div className="w-full flex justify-center "> Program score</div>
            <LineChart width={500} height={300} data={markData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="mark"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
        </div>
    )
}

export default MarkList