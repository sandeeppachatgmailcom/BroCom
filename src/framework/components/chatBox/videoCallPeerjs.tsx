import {  useEffect, useRef, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { IoMicOff } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { IoVideocamOffSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";   
import Peer from "simple-peer"
import VideoCallRoom from "../../../interfaces/pages/VideoCallRoom";
 

const VideoCallPeerjs = ({user,socket}:any) => {
    const [mute, setMute] = useState<boolean>(true)
    const [speakerMute, setSpeakerMute] = useState<boolean>(true)
    const [camview, setCamview] = useState<boolean>(true)
    const [call, setCall] = useState<boolean>(false)
    const [room, setRoom] = useState<boolean>(false)
    
   
    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	 
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState <any>()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")

	const myVideo:any = useRef()
	const userVideo :any= useRef()
	const connectionRef:any = useRef()
       
    useEffect(() => {
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream:any) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})

	    socket.on("me", (id:any) => {
			setMe(id)
		})

		socket.on("callUser", (data:any) => {
			 
			setCaller(data.from)
			setName(data.name)
			setCallerSignal(data.signal)
		})
	}, [])


	const callUser = (id:any) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal:any) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}

      
      
 

     
    return (
        <div className="h-[100%]   w-full rounded-xl border-8 border-gray-500 border-opacity-20 flex flex-col">
            {room ? <VideoCallRoom user={user} onClose={setRoom} /> : ''}
            <div className="relative flex w-full flex-col  rounded-xl    items-center overflow-scroll    bg-blue-950 justify-center     bg-opacity-5   h-[100%]">
                {/* <button onClick={() => setRoom(true)} className="flex relative text-black items-start     w-full   cursor-pointer  justify-start p-3  bg-opacity-35 m-1  h-[5%]">
                    {!room ? <BsBoxArrowInUpLeft /> : ''}
                </button> */}
                <div className="flex flex-col">
                    <>
                        {stream ?
                            <div className="flex  first: w-full overflow-hidden h-[50%] rounded-xl border-4  bg-opacity-40">
                                {/* <ReactPlayer playing={true} height={'100%'} width={'100%'} muted={false} url={myStream} /> */}
                                   <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} /> 
                            </div> :
                            <button className="   rounded-full h-[50%] w-full    p-1 ">
                                {!user?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-15 text-white-200 border-4 rounded-full border-white  p-2 text-opacity-35" /> : <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />}
                            </button>

                        }
                    </>
                    <>
                        {callAccepted && !callEnded ?
                            <div className="flex   w-full overflow-hidden h-[50%] rounded-xl  border-4 border-green-700 bg-opacity-40">
                                {/* <ReactPlayer playing={true} height={'100%'} width={'100%'} muted={false} url={remoteStream} /> */}
                                 
                                <video playsInline ref={userVideo} autoPlay style={{ width: "300px"}} /> 
                            </div> :
                            <button className="   rounded-full h-[50%] w-full  p-1 ">
                                {!user?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-15 text-white-200 border-4 rounded-full border-white  p-2 text-opacity-35" /> : <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />}
                            </button>

                        }
                    </>
                </div>
                <div className="absolute   animate-progress w-full ">

                   
                </div>
                <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-opacity-50 bg-gray-800 rounded-t-xl h-[25%]">
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">
                        {mute ? <HiMiniSpeakerWave onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <HiMiniSpeakerXMark onClick={() => setMute(!mute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div>
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">
                        {speakerMute ? <IoMic onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <IoMicOff onClick={() => setSpeakerMute(!speakerMute)} className=" border-4 ms-1   rounded-full border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div>
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden  ">

                    {!user.activeCall  ? <IoVideocamSharp onClick={() => { setCamview(!camview); callUser(idToCall)}} className=" border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            :<div className="flex w-full h-full">
                              <IoVideocamSharp onClick={() => { setCamview(!camview); answerCall() }} className=" border-4 ms-1 animate-pulse  rounded-full border-green-400 text-green-300 w-[100%] h-[100%] p-3" />
                              <IoVideocamOffSharp onClick={() => { setCamview(!camview);leaveCall()  }} className=" border-4 ms-1 animate-pulse  rounded-full border-red-600 text-red-600 w-[100%] h-[100%] p-3" />
                            </div>
                      }

                    </div >
                    <div className=" items-center justify-center flex  rounded-full overflow-hidden   ">
                        {call ? <IoCall onClick={() => setCall(!call)} className="  border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
                            : <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full  border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                        }
                    </div >

                </div>
            </div>



        </div>
    )
}

export default VideoCallPeerjs