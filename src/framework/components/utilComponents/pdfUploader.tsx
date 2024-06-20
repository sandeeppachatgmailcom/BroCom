import { useEffect, useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6"; 
import { FaCloudUploadAlt } from "react-icons/fa";
import { ProfileImageBox_Component } from "../../../entity/components/common/profileImageBox";
import { FaExclamation } from "react-icons/fa"; 
import PdfPreview from "./pdfViewer";
import uploadPDF from "../../services/uploadPdf";
const UploadPdfDocument = ({ height, width, changebutton,value,onSaveClick,onChange  }:ProfileImageBox_Component) => {
    const imageInputRef = useRef<HTMLInputElement | null> (null);
    const [formData,  ] = useState(value);
    const [upload,setUpload] =  useState(false)
    const [outData,setOutData] = useState({value:''})
    
    useEffect(() => {
        console.log(value,'input value  ')

        setOutData({value:value});
    }, [value]);
    useEffect(()=>{
     setUpload(false)   
    },[])

    const uploadImage = async (e:any) => {
        console.log(e,'s')
        const uploadPDFUrl = await uploadPDF(e.target.files[0]);
        console.log('reached ',{value:uploadPDFUrl})
        
        const newImage = {
            target: {
              name: 'uploadPDF',
              value: uploadPDFUrl,
            },
          };
        setOutData({value:uploadPDFUrl})
        console.log({value:uploadPDFUrl})
        onChange(newImage)
        console.log(newImage,'newImage')
        setUpload(true)
    };
     
    useEffect(()=>{
        console.log(formData,'formdata')
    },[formData])

    return (
        <div className="w-[100%] h-[100%]    flex   justify-center">
            <div style={{ height: height, width: width }} className="relative rounded-t-none rounded-b-2xl border-8 border-blue-500 border-opacity-10  w-20 h-20 overflow-hidden">
                <input ref={imageInputRef} onChange={(e) => { uploadImage(e)}} accept="application/pdf" type="file" hidden name="profileImage" id="" />
                
                {!outData.value ? <div className="h-[100%] w-[100%] flex-col   overflow-hidden flex justify-center items-center">
                    <h1 className="text-3xl text-gray-200 m-4">Empty</h1>
                    <FaExclamation   className="h-[50%]      text-gray-200 w-[50%]" /> 

                </div> :                  
                <div className="h-[100%] w-[100%] flex-col rounded-xl   overflow-scroll flex justify-center items-center">
                    <PdfPreview fileUrl={value} />
                    </div>
                } 
                {changebutton? <div className="absolute  bottom-5 end-10 bg-gray-600 bg-opacity-50  flex w-1/6 h-20 rounded-xl justify-between items-center p-4   ">
                    <button className="   text-white   " onClick={() => { imageInputRef?.current?.click(); }}> <FaCamera className="h-10 w-10" /> </button> 
                    {outData?.value?.length && upload   ? <button className="   text-white  " onClick={() => {onSaveClick() }}> <FaCloudUploadAlt  className="h-10 w-10" /> </button>:'' }
                </div>:''}
            </div> 
        </div>
    );
}

export default UploadPdfDocument;
