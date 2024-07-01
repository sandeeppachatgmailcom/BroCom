import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProfileImageBox from "../header/ProfileImageBox" 
import { Profile_Component } from "../../../entity/components/common/proFileComponent"
import { FaEdit } from "react-icons/fa";
const Profile = (_props:Profile_Component)=>{
    const user = useSelector((state:any)=>state.activeUser.user)
     
    const navigate = useNavigate()
    const handleAccountInfo = ()=>{
        navigate('/profile')
    }

    return(
        <div className={`p-2 m-1   flex flex-col h-[100%] w-full rounded-md shadow-xl `}>
           <div className="flex h-[60%]   flex-col justify-center border-white   p-1  ">
                <h6 className="font-bold text-sm  text-orange-500 ">{user?.admin?'Admin':''}</h6>
                <h6 className="font-bold text-sm  text-orange-500 ">{user?.trainer?'Staff':''}</h6>
                <h6 className="font-bold text-sm  text-orange-500 ">{user?.student?'Student':''}</h6>
                <ProfileImageBox changebutton={false} height='h-[90%]' width='w-[50%]' />
           </div>
            <div className="flex flex-col h-[30%] overflow-hidden ">
            
                <h4 className=" text-sm font-semibold  flex flex-wrap " >{user?.firstName?.toUpperCase() }</h4>
                {/* <h4 className="text-xl " >{Object.keys(user).length>0? user?.batch[0]?.batchName?.toUpperCase():'' }</h4> */}
                <h6 className="font-bold text-sm text-orange-500 ">{Object.keys(user).length && user.designationDetail ? user?.designationDetail[0]?.Designation:'' }</h6>
                <h5 className="text-sm">{user.email}</h5>
                <h5 className="text-sm">{user.mob}</h5>
                {/*<h5 className="text-sm">{user.web}</h5> <br></br>
                 <h5 className="text-sm">{user.streetName}</h5>
                <h5 className="text-sm">{user.pincode}</h5>
                <h5 className="text-sm">{user.city}</h5> */}
            </div>
            <div className="flex justify-end h-[10%] ">
                <button className="h-10 w-20 hover:bg-blue-400 hover:text-white  flex justify-center text-yellow-200  items-center  rounded-md " onClick={()=>handleAccountInfo()} > <FaEdit className="h-10 w-5" /> </button>
            </div>
            <br />
        </div>
    )
}

export default Profile