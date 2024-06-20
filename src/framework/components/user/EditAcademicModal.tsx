 

import { useDispatch, useSelector } from "react-redux";
import { FaWindowClose } from "react-icons/fa";
import { useRef, useState } from "react";

import axiosApi from "../../api/axios";
import { userApi } from "../../../entity/constants/api";

import { login } from "../../ReduxStore/activeUser";
const EditAcademicModal = (props:any) => {
    const { arrayindex,onClose, course } = props
    console.log(arrayindex,course,'anotherarrayIndex')
    const theme = useSelector((state:any) => state.theme.theme)
    const input = useSelector((state:any) => state.theme.inputtext)
    const user = useSelector((state:any) => state.activeUser.user)
    const dispatch = useDispatch()
    function* coursePeriod() {
        for (let i = 1947; i <= new Date().getFullYear(); i++) {
            yield i
        }
    }
    const [formData,setFormData]=useState(course)
    const [activeUser ] =  useState(user)
    
    const handleChange = (e:any)=>{
        const {value,name} = e.target 
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const saveData =async  ()=>{
        let updatedUser = { ...activeUser };
        const updatedAcademics = [...updatedUser.academics];
        updatedAcademics[arrayindex] = formData;
        updatedUser.academics = updatedAcademics;
        const result = await axiosApi.post(userApi.saveBasicProfile,updatedUser) 
        dispatch(login(result.data))
        if(result.data) onClose() 
        
    }
    
    const startYearRef = useRef<HTMLSelectElement>(null);

    console.log(startYearRef.current)
    const year = [...coursePeriod()]
    return (
        <div className="flex fixed inset-0  bg-gray-400 bg-opacity-30 backdrop-blur-sm justify-center items-center " >
            <div className={`${theme} xl:w-2/4 md:w-3/4 rounded-lg block text-gray-900 bg-gray-100 shadow-lg p-3 `}>
                <div className="flex justify-end">
                    <button onClick={() => { onClose() }} className="rounded-lg"> <FaWindowClose /> </button>
                </div>
                 
                    <div className="flex justify-between">
                        <label className="w-2/4" htmlFor="CourseType">Course </label>
                        <input onChange={(e)=>handleChange(e) } className={`${input} h-[40px] rounded w-2/4 `} name='course' value={formData.course} type="text"   id="CourseType" />
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="w-2/4" htmlFor="startYear">Start year</label>
                        <select onChange={(e)=>handleChange(e) } id="startYear" ref={startYearRef} name="startYear" value={formData.startYear} className={`${theme} rounded w-2/4 text-black h-10`} >
                            {year.map((item) => (
                                <option key={item} className={`${theme} rounded w-2/4 text-black h-10`}  value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-between items-center">
                        <label className="w-2/4" htmlFor="endYear">End year</label>
                        <select onChange={(e)=>handleChange(e) } id="endYear" name="endYear"value={formData.endYear} className={`${theme} rounded w-2/4 text-black h-10`} >
                            {year
                                .filter(item => item > 1947)
                                .map(item => (
                                    <option key={item} className={`${theme} rounded w-2/4 text-black h-10`}  value={item}>{item}</option>
                                ))
                            }
                            
                        </select>
                    </div>
                    <div className="flex justify-between ">
                        <label className="w-2/4 " htmlFor="CourseType">Institute   </label>
                        <input onChange={(e)=>handleChange(e) } name='institute' value={formData.institute} className={`${input}  rounded w-2/4 `} type="text"  id="CourseType" />
                    </div>
                    <div className="flex justify-end items-center">
                         
                    <button onClick={()=>saveData()} className="rounded w-1/12 bg-blue-400">  Save </button>
                </div>
                
            </div>
        </div>
    )
}

export default EditAcademicModal