import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../services/firebase";
import axiosApi from "../../api/axios"; 
import { userApi } from "../../../entity/constants/api"; 
import { login } from "../../ReduxStore/activeUser";
import { ProfileImageBox_Component } from "../../../entity/components/common/profileImageBox";
 

const ProfileImageBox = ({ height, width, changebutton }:ProfileImageBox_Component) => {
    const imageInputRef = useRef<HTMLInputElement | null> (null);
    const dispatch = useDispatch();
    const activeUser = useSelector((state:any) => state.activeUser.user);
    const [formData, setFormData] = useState(activeUser);

    useEffect(() => {
        setFormData(activeUser);
    }, [activeUser]);
    useEffect(()=>{
        
    },[])

    const uploadImage = async (e:any) => {
        const uploadedUrl = await UploadImage(e.target.files[0]);
        const data = {
            ...formData,
            profileImage: uploadedUrl
        }
        const getProfile =await  axiosApi.post(userApi.saveBasicProfile,data)
        dispatch(login(getProfile.data)) 
        
    };

    return (
        <div className="w-full h-100 flex justify-center">
            <div className={`relative bg-gray-400  ${height} ${width} rounded-full    overflow-hidden`}>
                <input ref={imageInputRef} onChange={(e) => uploadImage(e)} type="file" hidden name="profileImage" id="" />
                 
                    <div className="h-[100%] w-[100%] border-opacity-40 border-8 border-blue-900 rounded-full" style={{ backgroundImage: `url(${formData.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                 
                {changebutton? <button className="absolute bottom-[20%] text-white right-[20%] " onClick={() => {
                    imageInputRef?.current?.click();
                }}>
                    <FaCamera className="h-[202%] w-[202%]" />
                </button>:''}
            </div>
        </div>
    );
}

export default ProfileImageBox;
