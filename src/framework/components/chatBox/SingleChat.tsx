
import { IoChatbubbleEllipsesOutline } from "react-icons/io5"; 
import { MdVideoCameraBack } from "react-icons/md";
import { useSelector } from "react-redux"; 
import { useEffect, useState } from "react";
import { IoSend } from "react-icons/io5";
import { UserEntity_Model } from "../../../entity/response/userModel";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
import { memo } from 'react'; 
import VideoCall from "./VideoCall";
import TextDisplay from "./TextDisplayer"; 
const tempSingleChat = ({socket,onChange, sendMessage, user, userChat, chatHead }: {startCall:any ,endCall:any , socket :any, onChange:any, sendMessage:any, chatHead:any, user:any, userChat: object[] }) => {
    const activeUser: UserEntity_Model = useSelector((state:any) => state.activeUser.user)
    const [data, setData] = useState<any>([])
    const [videoCall,setVideoCall] = useState(false)
    const [newData, setNewData] = useState({
        senderMessage: '',
        receiverMessage: '',
        TransDateTime: new Date().toISOString(),
        receiverId: user?.email,
        senderId: activeUser.email,
        conversationId: chatHead?.converationId
    })
    useEffect(() => {
        setData(userChat)
         
    }, [userChat])
    
    useEffect(()=>{
       
         
        if(user?.activeCall) setVideoCall(true)
            else setVideoCall(false)
    },[user])
    const sendData = async () => {
        const obj =
        {
            senderMessage: newData.senderMessage,
            receiverMessage: '',
            TransDateTime: new Date().toISOString(),
            receiverId: user?.email,
            senderId: activeUser.email,
            conversationId: chatHead?.converationId
        }
      
        if (newData?.senderMessage?.trim().length) {

            const message = await axiosApi.post(chatApi.sendMessage, obj)
            sendMessage(obj)
           
            onChange([message.data, ...data])

            setNewData({
                senderMessage: '',
                receiverMessage: '',
                TransDateTime: new Date().toISOString(),
                receiverId: user?.email,
                senderId: activeUser.email,
                conversationId: ''
            })
        }
    }
     

    const handleChage = (e: any) => {
        const { name, value } = e.target;
        setNewData({
            ...newData,
            [name]: value
        })
        console.log(name, value, 'name, value')
    }

    return (
        <div className="w-full block rounded-xl p-2     h-[100%] ">
            <div className="h-[15%] flex justify-between">
                <div className="flex items-center h-[80%]  justify-start w-3/4 p-2    ">
                    <div  className=" me-2 shadow-md border  h-10 w-10    rounded-full bg-blue-500   overflow-hidden ">
                    <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${user?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} /> 
                    </div>
                    <button className="text-1xl w-10/12 h-[100%] text-2xl break-words  items-center  flex " >{user?.firstName}</button>
                </div>
                <div className="flex w-2/4">
                    <button onClick={()=>setVideoCall(false)} className="mx-3 text-green-500" > <IoChatbubbleEllipsesOutline className="h-10 w-10" /> </button>
                    <button onClick={()=>{setVideoCall(true); }} className="mx-3 text-green-500" >  <MdVideoCameraBack className="h-10 w-10" />  </button>
                </div>
            </div>
             
            {videoCall == true?
            <div className="h-[70%] flex-col overflow-y-scroll          rounded-xl    flex  p-1">
            {/* <VideoCallPeerjs socket={socket}  user={user}/>  */}
                <VideoCall socket={socket}  user={user}/>
            </div>:
            <div className="h-[70%] overflow-y-scroll   rounded-xl flex flex-col-reverse p-3">
                <TextDisplay activeUser ={activeUser} user = {user} userChat={userChat} />
        </div>}

            <div className="h-[15%] rounded-xl  bg-gray-600  flex p-2 bg-opacity-5">
                <div className="w-full h-[100%]    flex rounded-xl">
                    <input onChange={(e) => { handleChage(e) }} value={newData.senderMessage} name='senderMessage' className="p-2 focus:outline-none focus:outline-gray-600 rounded-xl border-opacity-20  border-gray-600 border   h-full w-full bg-transparent flex " type="text" id="" />
                    <button onClick={() => { sendData(); }} className=" rounded-xl  w-20 h-full ms-1  focus:outline-none    p-3  focus:outline-gray-500 ">
                        <IoSend className="h-full w-full" />
                    </button>
                </div>
            </div>
        </div>
    )
}

const SingleChat = memo(tempSingleChat)

export default SingleChat