import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UploadImageDocument from "./UploadImage"
import UploadPdfDocument from "./pdfUploader"


const Gallery = ()=>{
    const activeUser = useSelector((state:any)=>state.activeUser.user) 
    const validationArray = useSelector((state:any)=>state.validationArray.value)
    const [images,setImages] = useState<any>([])
    const [zoom, setZoom] = useState<any>({});

    const handleZoom = (index:any) => {
        setZoom((prevState:any)  => ({
            ...prevState,
            [index]: prevState[index] === ' w-full h-[800px]' ? ' w-full h-[400px]' : ' w-full h-[800px]'
        }));
    };
    useEffect(()=>{
       const OutImageBox:any = []
        
       if(activeUser.submission ){
        Object.keys(activeUser.submission).map((subm)=>{
            Object.keys(activeUser.submission[subm]).map((task)=>{
                if(task != 'program' &&  !validationArray.includes(activeUser.submission[subm][task][0].taskType)){
                    console.log(  activeUser.submission[subm][task][0])
                    const data = activeUser.submission[subm][task][0]
                    const imageBox = {
                        name:data.taskName,
                        sub:data.taskSub,
                        link:data.tasklink,
                        type:data.taskType
                    }
                    OutImageBox.push(imageBox) 
                }
            })
            console.log(OutImageBox,'OutImageBox')
            setImages(OutImageBox)
        })
    }
    },[activeUser])
    return(
        <div className="grid grid-cols-3 gap-4 p-4">
              
                {images && images.length > 0 && images.map((image:any, index:number) => (
                    <div 
                        key={index}
                        onClick={() => handleZoom(index)} 
                        className={`relative ${zoom[index] || ' w-full h-[400px]'} flex flex-col shadow-xl items-end m-1 hover:shadow-2xl bg-gray-400 bg-opacity-15 rounded-xl`}>
                        
                        <div className='p-4 w-9/12 h-20 bottom-4 mt-3 text-end items-center flex justify-end z-50 bg-gray-800 bg-opacity-35 rounded-s-2xl absolute'>
                            <h1 className="text-2xl text-white">{image?.name}</h1>
                        </div>
    
                        {image.type === "imageDocument" ? (
                            <div className="w-full h-[100%] absolute p-1">
                                <UploadImageDocument height='100%' width='100%' value={image?.link} /> 
                            </div>
                        ) : (
                            <div className="w-full rounded-2xl h-[100%] absolute">
                                <UploadPdfDocument height='100%' width='100%' value={image?.link} />  
                            </div>
                        )}
                    </div>
                ))}
       
         
        </div>
    )
}

export default Gallery