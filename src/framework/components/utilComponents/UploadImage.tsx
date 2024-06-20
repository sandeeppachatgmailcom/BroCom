import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6"; 
import UploadImage from "../../services/firebase"; 
import { FaCloudUploadAlt } from "react-icons/fa";
import { ProfileImageBox_Component } from "../../../entity/components/common/profileImageBox";
import { FaExclamation } from "react-icons/fa"; 
const UploadImageDocument = ({ height, width, changebutton,value,onSaveClick,onChange  }:ProfileImageBox_Component) => {
    const imageInputRef = useRef<HTMLInputElement | null> (null);
     
    const [formData,  ] = useState(value);
    const [upload,setUpload] =  useState(false)
    const [outData,setOutData] = useState({value:''})
    
    useEffect(() => {
        setOutData({value:value});
    }, [value]);
    useEffect(()=>{
     setUpload(false)   
    },[])

    const uploadImage = async (e:any) => {
        const uploadedUrl = await UploadImage(e.target.files[0]);
        console.log('reached ',{value:uploadedUrl})
        
        const newImage = {
            target: {
              name: 'uploadedImageUrl',
              value: uploadedUrl,
            },
          };
     
        
         console.log(newImage,'newImage')
         
        setOutData({value:uploadedUrl})
        console.log({value:uploadedUrl})
        onChange(newImage)
        console.log(newImage,'newImage')
        setUpload(true)
      //  const getProfile =await  axiosApi.post(userApi.saveBasicProfile,data)
        //dispatch(login(getProfile.data)) 
        
    };
     
    useEffect(()=>{
        console.log(formData,'formdata')
    },[formData])

    return (
        <div className="w-[100%] h-[100%]    flex  rounded-b-2xl rounded-t-none   justify-center">
            <div style={{ height: height, width: width }} className="relative rounded-t-none rounded-b-2xl      w-20 h-20 overflow-hidden">
                <input ref={imageInputRef} onChange={(e) => uploadImage(e)} accept="image/*" type="file" hidden name="profileImage" id="" />
                {!outData.value ? <div className="h-[100%] w-[100%] flex-col   overflow-hidden flex justify-center items-center">
                    <h1 className="text-3xl text-gray-200 m-4">Empty</h1>
                    <FaExclamation   className="h-[50%]      text-gray-200 w-[50%]" /> 
                </div> :                  
                    <div className="h-[100%] w-[100%]     border-blue-800 border-opacity-35 rounded-xl overflow-hidden " style={{ backgroundImage: `url(${outData.value})`,backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain' }} />
                } 
                {changebutton? <div className="absolute  bottom-5 end-10 bg-gray-600 bg-opacity-50  flex w-1/6 h-20 rounded-xl justify-between items-center p-4   ">
                    <button className="   text-white   " onClick={() => { imageInputRef?.current?.click(); }}> <FaCamera className="h-10 w-10" /> </button> 
                    {outData?.value?.length && upload   ? <button className="   text-white  " onClick={() => {  onSaveClick() }}> <FaCloudUploadAlt  className="h-10 w-10" /> </button>:'' }
                </div>:''}
            </div> 
        </div>
    );
}

export default UploadImageDocument;
