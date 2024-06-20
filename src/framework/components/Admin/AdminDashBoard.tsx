import { useEffect, useState } from "react";
import useWeeklyStudentsDetails from "../../../useCases/useWeeklyStudentsDetails";
import RoundedPropotionalGraph from "../graphs/RoundedPropotionalGraph"
import useGetBatchWiseStudents from "../../../useCases/useGetBatchWiseStudents";
import CircleChart from "../graphs/CircleGraph";
import useGetDesignationWiseStaffCount from "../../../useCases/useGetDesignationWiseStaffCount";






const AdminDashBoard =  (_props:any)=>{
     
      const [data,setData] = useState([])
      const [batchSummary,setBatchSummary] = useState([])
      const [desiSummary,setDesiSummary] = useState([])
      
      const tempData :unknown = useWeeklyStudentsDetails()
      const btchSummary = useGetBatchWiseStudents()
      const employeeSummary = useGetDesignationWiseStaffCount()
      
      useEffect(()=>{
        const data:unknown  = employeeSummary?.map((item:any)=>{ return {name:item.Designation, value:item.staffCount} })
        setDesiSummary(data)
      },[employeeSummary])
      
      useEffect(()=>{
        const data:unknown =  btchSummary?.map((item:unknown)=>{return {name:item._id, value:item.count}} )
        setBatchSummary(data)
      },[btchSummary])
      useEffect(()=>{
        if(tempData){
        const temp:any = tempData?.map((item:any)=>{
            return {name:item.Xvalue,count:item.students}
        })
        setData(temp)}
      },[tempData])

     
    return(
        <div className= {`h-[100%] p-3  rounded-xl bg-opacity-15 m-1    flex w-full flex-col  `}>
            <div className="flex p-3 shadow-2xl w-full h-[30%]    rounded-2xl bg-opacity-5  ">
            <RoundedPropotionalGraph data={data} />
            </div>
            <div className="flex flex-wrap p-3 shadow-2xl w-full  mt-3 h-[100%] lg:h-[50%]    rounded-2xl bg-opacity-5  ">
              <div className="flex w-full  md:w-3/6 rounded-xl bg-blue-950 bg-opacity-5   shadow-xl h-[100%] ">
                  <CircleChart   data={batchSummary}  />  
              </div>
              <div className="flex w-full  md:w-3/6 rounded-xl bg-blue-950 bg-opacity-5  shadow-xl h-[100%] ">
                  <CircleChart   data={desiSummary}  />  
              </div>
              

            </div>
        </div>
    )
}

export default AdminDashBoard
