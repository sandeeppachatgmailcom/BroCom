import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
// import UploadImage from "../../services/firebase";
import axiosApi from "../../api/axios"; 
import { userApi } from "../../../entity/constants/api"; 
import { login } from "../../ReduxStore/activeUser";
import { ProfileImageBox_Component } from "../../../entity/components/common/profileImageBox";
import { getObjectUrl, putObject } from "../../services/s3Bucket";
import axios from "axios";
 

const ProfileImageBox = ({ height, width, changebutton }:ProfileImageBox_Component) => {
    const imageInputRef = useRef<HTMLInputElement | null> (null);
    const dispatch = useDispatch();
    const activeUser = useSelector((state:any) => state.activeUser.user);
    const [formData, setFormData] = useState(activeUser);
    const [imageLink,setImagelink] = useState('') 
    
    const generatePdfUrl = async (documentKey:string)=>{
        const currentFile = await getObjectUrl(documentKey) 
         
        setImagelink(currentFile)
    }

    useEffect(() => {
        setFormData(activeUser);
        generatePdfUrl(activeUser.profileImage)
    }, [activeUser]);
    useEffect(()=>{
        
    },[])

    const uploadImage = async (e:any) => {
        const image:any = e.target.files[0]
        const fileName = `mangrow/image/${Date.now()}.${image.type}`
        const uploadImageUrl = await putObject(fileName)
         await axios.put(uploadImageUrl, image, {
             headers: {
                 'Content-Type': image.type,
             },
         });
        
        const data = {
            ...formData,
            profileImage: fileName
        }
        const getProfile =await  axiosApi.post(userApi.saveBasicProfile,data)
        dispatch(login(getProfile.data)) 
        
    };

    return (
        <div className="w-full h-100 flex justify-center">
            <div className={`relative bg-gray-400  ${height} ${width} rounded-full    overflow-hidden`}>
                <input ref={imageInputRef} onChange={(e) => uploadImage(e)} type="file" hidden name="profileImage" id="" />
                 
                    <div className="h-[100%] w-[100%] border-opacity-40 border-8 border-blue-900 rounded-full" style={{ backgroundImage: `url(${imageLink})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                 
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
