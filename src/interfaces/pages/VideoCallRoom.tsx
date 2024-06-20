import  { useState } from 'react'; 
import { CgArrowBottomRightR } from "react-icons/cg"; 
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from 'react-icons/hi2';
import { IoCall, IoMic, IoMicOff, IoVideocamOffSharp, IoVideocamSharp } from 'react-icons/io5';
import { MdAddIcCall } from 'react-icons/md';
import IndividualVideoTile from '../../framework/components/chatBox/IndividualVideoTile'; 

const VideoCallRoom = ({   onClose, children, user }:{   onClose:any, children?:any, user:any }) => {
    const [count, setCount] = useState(0)
    const [mute, setMute] = useState(false)
    const [speakerMute, setSpeakerMute] = useState(true)
    const [camview, setCamview] = useState(true)
    const [call, setCall] = useState(false) 
   
    setInterval(() => {
        setCount(count)
        if (count == 900) setCount(100)
    }, 1000)

    return (
        <div className={`  bg-opacity-10 fixed inset-0 z-50 overflow-auto   flex justify-center items-center`}>

            <div className={`   bg-gray-600 bg-opacity-50    modal-overlay fixed     w-full h-full`}></div>
            <div className="modal-container h-[100%]  w-full    rounded shadow-lg z-50 ">
                <div className="modal-content py-4 text-left px-6 h-[100%]">
                    <div className="flex flex-col justify-between items-center h-[100%]">
                        <div className="flex  w-full flex-wrap flex-col justify-center items-center rounded-xl h-[75%]  ">
                            <button onClick={() => onClose(false)} className="flex items-start w-full rounded-xl cursor-pointer  justify-start p-3   bg-opacity-85 m-1  h-20">
                                <CgArrowBottomRightR className='h-20' />
                            </button>
                            <div className='flex flex-wrap justify-center '>
                                {Array(10).fill(null).map((_, index) => (
                                    <div className='m-1 w-2/12 h-80'>
                                        <IndividualVideoTile key={index} user={user} />
                                    </div>
                                ))}
                            </div>
                            <h1 className='text-2xl text-white' >please wait... its loading </h1>

                            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-3 border-white">

                                <div className={`border-green-800 text-orange-400 rounded-full   h-10 w-10`}>


                                </div>

                            </div>


                        </div>
                        <div className="flex w-full items-center justify-center rounded-xl  m-1  h-[25%]">
                            <div className="flex w-full justify-center rounded-xl bg-blue-950 bg-opacity-15 m-1  h-[45%]">
                                <div className=" items-center  justify-center flex  rounded-full overflow-hidden p-1 ">
                                    {mute ? <HiMiniSpeakerWave onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[70%] p-3" />
                                        :
                                        <HiMiniSpeakerXMark onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[70%] p-3" />
                                    }
                                </div>
                                <div className=" items-center justify-center flex  rounded-full overflow-hidden p-1 ">
                                    {speakerMute ? <IoMic onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[70%] p-3" />
                                        :
                                        <IoMicOff onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[70%] p-3" />
                                    }
                                </div>
                                <div className=" items-center justify-center flex  rounded-full overflow-hidden p-1 ">
                                    {camview ? <IoVideocamSharp onClick={() => setCamview(!camview)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[70%] p-3" />
                                        :
                                        <IoVideocamOffSharp onClick={() => setCamview(!camview)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[70%] p-3" />
                                    }

                                </div >
                                <div className=" items-center justify-center flex  rounded-full overflow-hidden p-1  ">
                                    {call ? <IoCall onClick={() => setCall(!call)} className="  border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[70%] p-3" />
                                        :
                                        <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full  border-gray-500 text-gray-500 w-[100%] h-[70%] p-3" />
                                    }

                                </div >
                            </div>
                        </div>

                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default VideoCallRoom;
