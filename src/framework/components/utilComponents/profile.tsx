import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import ProfileImageBox from "../header/ProfileImageBox" 
import { Profile_Component } from "../../../entity/components/common/proFileComponent"

const Profile = (props:Profile_Component)=>{
    const darkTheme = useSelector((state:any) =>state.theme)
    const user = useSelector((state:any)=>state.activeUser.user)
    const navigate = useNavigate()
    const handleAccountInfo = ()=>{
        navigate('/profile')
    }

    return(
        <div className={`${darkTheme.theme}   p-2 m-1 rounded shadow-md `}>
           <div className="flex border-white border-spacing-5 p-1  ">
           <ProfileImageBox height='200px' changebutton={false} width='200px' imageLink={user.profileImage} onParentChange={()=>{}} />
           </div>
            <>
            
                <h4 className="text-2xl font-semibold " >{user?.firstName?.toUpperCase() }</h4>
                <h4 className="text-xl " >{Object.keys(user).length>0? user?.batch[0]?.batchName?.toUpperCase():'' }</h4>
                <h5>{user.email}</h5>
                <h5>{user.mob}</h5>
                <h5>{user.web}</h5> <br></br>
                <h5>{user.streetName}</h5>
                <h5>{user.pincode}</h5>
                <h5>{user.city}</h5>
            </>
            <div className="flex justify-end">
                <button onClick={()=>handleAccountInfo()} > Edit bio </button>
            </div>
            <br />
        </div>
    )
}

export default Profile