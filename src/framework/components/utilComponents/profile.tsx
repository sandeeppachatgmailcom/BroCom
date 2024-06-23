import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProfileImageBox from "../header/ProfileImageBox" 
import { Profile_Component } from "../../../entity/components/common/proFileComponent"

const Profile = (_props:Profile_Component)=>{
    const user = useSelector((state:any)=>state.activeUser.user)
     
    const navigate = useNavigate()
    const handleAccountInfo = ()=>{
        navigate('/profile')
    }

    return(
        <div className={`p-2 m-1 block rounded-md shadow-xl `}>
           <div className="flex flex-col justify-center border-white border-spacing-5 p-1  ">
                <h6 className="font-bold text-2xl text-orange-500 ">{user?.admin?'Admin':''}</h6>
                <h6 className="font-bold text-2xl text-orange-500 ">{user?.trainer?'Staff':''}</h6>
                <h6 className="font-bold text-2xl text-orange-500 ">{user?.student?'Student':''}</h6>
                <ProfileImageBox changebutton={false} height='h-[200px]' width='w-[200px]' />
           </div>
            <div className=" overflow-hidden ">
            
                <h4 className="text-2xl font-semibold  flex flex-wrap " >{user?.firstName?.toUpperCase() }</h4>
                {/* <h4 className="text-xl " >{Object.keys(user).length>0? user?.batch[0]?.batchName?.toUpperCase():'' }</h4> */}
                <h6 className="font-bold text-2xl text-orange-500 ">{Object.keys(user).length && user.designationDetail ? user?.designationDetail[0]?.Designation:'' }</h6>
                <h5>{user.email}</h5>
                <h5>{user.mob}</h5>
                <h5>{user.web}</h5> <br></br>
                <h5>{user.streetName}</h5>
                <h5>{user.pincode}</h5>
                <h5>{user.city}</h5>
            </div>
            <div className="flex justify-end">
                <button onClick={()=>handleAccountInfo()} > Edit bio </button>
            </div>
            <br />
        </div>
    )
}

export default Profile