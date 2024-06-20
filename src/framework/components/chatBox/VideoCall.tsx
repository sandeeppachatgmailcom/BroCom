import { useCallback, useEffect, useState } from "react";
import { FaUserTie } from "react-icons/fa6";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { HiMiniSpeakerXMark } from "react-icons/hi2";
import { IoMicOff } from "react-icons/io5";
import { IoMic } from "react-icons/io5";
import { IoVideocamSharp } from "react-icons/io5";
import { IoVideocamOffSharp } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";
import { FaArrowsSpin } from "react-icons/fa6";
import ReactPlayer from 'react-player' 
import peer from "../../services/peer"; 
import { useSelector } from "react-redux";
import { Socket } from "socket.io-client";
const VideoCall = ({ user, socket }: { user: any, socket: Socket }) => {
  const [mute, setMute] = useState(true)
  const [speakerMute, setSpeakerMute] = useState(true)
  const [camview, setCamview] = useState(0)
  const [call, setCall] = useState(false)
  
  const activeUser = useSelector((state: any) => state.activeUser.user)
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState<any>();
  const [remoteStream, setRemoteStream] = useState();

  const handleUserJoined = useCallback(async ({ email, id, room }:any) => {
     
    setRemoteSocketId(id);
   
    setCamview(0)
    if (room != email && !user.activeCall) {
      setCamview(1)
    }
  }, []);
  
  const handleCallUser = async () => {
     
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();

    setMyStream(stream);
    socket.emit("user:call", { to: remoteSocketId, offer });
     
  };

  const handleIncommingCall = useCallback(
    async ({ from, offer }:any) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: mute,
        video: true,
      });
      setMyStream(stream);
       
      setCamview(2)
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({   ans }:any) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }:any) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }:any) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev:any) => {
      const remoteStream = ev.streams;
      
      setRemoteStream(remoteStream[0]);
    });
  }, []);



  useEffect(() => {
   
    if (!user.activeCall) {
       
      socket.emit("room:join", { email: activeUser.email, room: activeUser.email, to: user.email });

    }
    else {
      
      socket.emit("room:join", { email: activeUser.email, room: user.email, to: user.email });
    }
    
  }, [user.activeCall])

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);


  return (
    <div className="h-[100%]   w-full rounded-xl border-8 border-gray-500 border-opacity-20 flex flex-col">
      {/* {room ? <VideoCallRoom user={user} onClose={setRoom} /> : ''} */}
      <div className="relative flex w-full flex-col  rounded-xl    items-center overflow-scroll    justify-center     bg-opacity-5   h-[100%]">
        {/* <button onClick={() => setRoom(true)} className="flex relative text-black items-start     w-full   cursor-pointer  justify-start p-3  bg-opacity-35 m-1  h-[5%]">
                    {!room ? <BsBoxArrowInUpLeft /> : ''}
                </button> */}
        <div className=" flex relative   rounded-xl h-[100%] w-full items-center justify-center flex-col">
          <>
            <div className="absolute flex w-1/2  overflow-hidden h-[50%] m-2  bg-opacity-40 rounded-full justify-center items-center ">
              {camview == 0 ?  <FaArrowsSpin    className=" ms-1 text-opacity-80  animate-spin   text-green-400  h-[50%] w-[50%] p-1" /> : ''}
            </div>

          </>
          <>
            {myStream ?
              <div className="flex absolute overflow-hidden start-1 top-1 h-1/4 w-1/4 rounded-xl     m-2  bg-opacity-40">
                <ReactPlayer  muted={speakerMute}  playing={true} height={'100%'} width={'100%'} url={myStream} />
              </div> :
              <button className="   rounded-xl h-[45%] w-full   mb-2 border-gray-600 border-opacity-25  ">
                {!activeUser?.profileImage?.length ? <FaUserTie className=" h-[100%] w-[100%] bg-blue-950 bg-opacity-15 text-white-200   rounded-full  p-2 text-opacity-35" /> : <div className="h-[95%] w-[50%] rounded-2xl  bg-opacity-25   overflow-hidden  flex  " style={{ backgroundImage: `url(${activeUser?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'contain',backgroundRepeat:'no-repeat' }} />}
              </button>

            }
          </>
          <>
            {remoteStream ?
              <div className="flex   w-full overflow-hidden -z-10 absolute h-[100%] rounded-xl p-1   m-2 bg-opacity-40">
                <ReactPlayer playing={true} height={'100%'} width={'100%'} muted={false} class='rounded-xl'  url={remoteStream} />
              </div> :
              <button className="   rounded-xl h-[45%] mt-2 w-full flex items-center  p-1 justify-end ">
                {!user?.profileImage?.length ? <FaUserTie className=" h-[100%]    w-[50%] bg-blue-950 bg-opacity-15 text-white-200  rounded-full  p-2 text-opacity-35" /> : <div className="h-[100%] w-[50%] bg-gray-300  bg-opacity-25  rounded-2xl" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'contain',backgroundRepeat:'no-repeat' }} />}
              </button>

            }
          </>
        </div>
        <div className="absolute   animate-progress w-full ">
          {/* 
                    {!camview ? <div className=" rounded-full   h-2 w-full flex justify-around animate-dots">
                        <div className="h-6 w-6 bg-violet-500  items-center flex justify-center  rounded-full">R</div>
                        <div className="h-6 w-6 bg-indigo-500 items-center flex justify-center  rounded-full">i</div>
                        <div className="h-6 w-6 bg-blue-500 items-center flex justify-center  rounded-full">n</div>
                        <div className="h-6 w-6 bg-green-500 items-center flex justify-center  rounded-full">g</div>
                        <div className="h-6 w-6 bg-yellow-500 items-center flex justify-center  rounded-full">i</div>
                        <div className="h-6 w-6 bg-orange-500 items-center flex justify-center  rounded-full">n</div>
                        <div className="h-6 w-6 bg-gray-600  items-center flex justify-center  rounded-full">g</div>
                    </div> : ''} */}
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 p-2 bg-opacity-50 bg-gray-800 rounded-t-xl h-[25%]">
          <div className=" items-center justify-center flex   rounded-full overflow-hidden  ">
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

            {camview == 1 ? <IoVideocamSharp onClick={() => { handleCallUser() }} className=" border-4 ms-1 animate-pulse  rounded-full border-green-400 text-green-300 w-[100%] h-[100%] p-3" />
              : camview == 2 ? <div className="flex w-full h-full">
                <IoVideocamSharp onClick={() => { sendStreams() }} className=" border-4 ms-1 animate-pulse  rounded-full border-green-400 text-green-300 w-[100%] h-[100%] p-3" />
                <IoVideocamOffSharp onClick={() => { }} className=" border-4 ms-1 animate-pulse  rounded-full border-red-600 text-red-600 w-[100%] h-[100%] p-3" />
              </div> : ''
            }


          </div >
          <div className=" items-center justify-center flex  rounded-full overflow-hidden   ">
            {call && !user.activeCall ? <IoCall onClick={() => setCall(!call)} className="  border-4 ms-1   rounded-full border-blue-400 text-blue-500 w-[100%] h-[100%] p-3" />
              : !call && !user.activeCall ? <MdAddIcCall onClick={() => setCall(!call)} className=" border-4 ms-1   rounded-full   border-gray-500 text-gray-500 w-[100%] h-[100%] p-3" />
                : ''
            }
          </div >

        </div>
      </div>



    </div>
  )
}

export default VideoCall