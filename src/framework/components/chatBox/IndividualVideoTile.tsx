import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { IoMicOff } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { IoVideocamOffSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { BsBoxArrowInUpLeft } from "react-icons/bs"; 
const IndividualVideoTile = ({ user }:{user:any}) => {
    const [mute, setMute] = useState(true)
    const [speakerMute, setSpeakerMute] = useState(true)
    const [camview, setCamview] = useState(true)
    const [call, setCall] = useState(false)
    const [room, setRoom] = useState(false)
    return (
        <div className="h-[100%] w-full flex   rounded-xl    flex-col">

            <div className="flex w-full flex-col    items-center rounded-xl bg-blue-950 justify-center overflow-hidden  bg-opacity-35 m-1 p-1  h-[70%]">
                <button onClick={() => setRoom(true)} className="flex items-start w-full rounded-xl cursor-pointer  justify-start p-3  bg-opacity-35 m-1  h-[5%]">
                    {!room ? <BsBoxArrowInUpLeft /> : ''}
                </button>

                <button className="   rounded-full h-[80%]   w-[40%] p-1 ">

                    {!user?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-25 text-white-200 border-4 rounded-full border-white  p-2 text-opacity-35" /> : <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />}

                </button>

            </div>
            <div className="flex w-full justify-center rounded-xl bg-blue-950 bg-opacity-35 m-1  h-[30%]">
                <div className=" items-center justify-center flex  rounded-full overflow-hidden p-1 ">
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
                        <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full bg-orange-600  border-gray-500 text-gray-500 w-[100%] h-[70%] p-3" />
                    }

                </div >
            </div>

        </div>
    )
}

export default IndividualVideoTile