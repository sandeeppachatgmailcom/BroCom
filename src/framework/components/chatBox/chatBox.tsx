import { useEffect, useRef, useState } from "react";
import { MdVideoCameraBack, MdOnlinePrediction } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoCall } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
import { io } from 'socket.io-client';
import { updateChatUser } from "../../ReduxStore/activeChatuser";
import useContactList from "../../../useCases/useContactList";
import SingleChat from "./SingleChat";
import { FaUserGraduate } from "react-icons/fa6";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { FaChessKing } from "react-icons/fa";
import Profile from "../utilComponents/profile";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Role from "../../../interfaces/pages/Role";

const ChatBox = ({ SetStudent }: any) => {
  const multipleUser = useSelector((state) => state.multiUser.show)
  const [real, setReal] = useState([]);
  const currentChatUser = useSelector((state) => state.activeChatUser.user);
  const [conversation, setConversation] = useState({});
  const activeUser = useSelector((state: any) => state.activeUser.user);
  const [user, setUser] = useState({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef();
  const [socket, setSocket] = useState(null);
  const contact = useContactList(searchText);
  const [initialSocket, setInitialSocket] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const newSocket = io('ws://localhost:4000');
    setSocket(newSocket);
    setInitialSocket(true);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!Object.keys(activeUser).length) {
      socket?.emit("logout");
    } else {
      socket?.emit("addUser", { userid: activeUser.email });
    }
  }, [activeUser, socket]);

  useEffect(() => {
    console.log(user)
    dispatch(updateChatUser(user));
  }, [user, dispatch]);

  const checkOnline = (email) => {
    return onlineUsers.some(online => email === online.userId);
  };

  useEffect(() => {
    if (initialSocket) {
      socket?.emit("addUser", { userid: activeUser.email });
      setInitialSocket(false);
    }

    const handleUsersOnline = (message) => {
      setOnlineUsers(message);
    };

    const handleAddUser = (message) => {

    };

    const handleSendMessage = (message) => {
      if (message.receiverId === activeUser.email) {
        console.log(message, 'message received here');
        setReal(prevReal => [message, ...prevReal]);
      }
    };

    socket?.on("usersOnline", handleUsersOnline);
    socket?.on("addUser", handleAddUser);
    socket?.on("send-message", handleSendMessage);
    socket?.on("incomingCall",(message)=>{
      
      const user = contact.filter((item)=> { console.log(item.email,'55555555'); return item.email == message.senderId} ) 
      console.log(user,'incoming call')
      setUser(user)
      setSelectedUser(user.email)
    } )

    return () => {
      socket?.off("usersOnline", handleUsersOnline);
      socket?.off("addUser", handleAddUser);
      socket?.off("send-message", handleSendMessage);
    };
  }, [socket, initialSocket, activeUser.email]);

  const sendMessage = (message) => {
    console.log(message, 'my new Message');
    socket?.emit("send-message", message);
  };

  const dialACall = (message)=>{
    console.log(message,'messsage')
    socket.emit("dialACall",message)
  }

  const getConversation = async (receiverEmail) => {
    const data = {
      senderId: activeUser.email,
      receiverId: receiverEmail
    };
    const chat = await axiosApi.post(chatApi.intiateConversation, data);
    setConversation(chat.data.conversation);
    setReal(chat?.data?.messages);
  };
  const opennewTab = () => {
    window.open('http://localhost:5173/role', '_blank');
  }
  const searchUser = (e) => {
    const { value } = e.target;
    setSearchText(value);
  };

  return (
    <div className="shadow-lg p-2 flex flex-col overflow-scroll h-full rounded-xl">
      {multipleUser ?
        <div className="w-full items-center justify-center shadow-2xl h-[40%] flex-col flex border-8 overflow-scroll bg-blue-600 bg-opacity-15 border-opacity-20  border-gray-500 rounded-3xl rounded-tr-none p-1">

          <button onClick={opennewTab} className="items-center justify-center text-1xl w-1/2 p-2 h-[50%] flex-col flex m-1 rounded-xl bg-gray-500 bg-opacity-15">
            <IoPersonAddSharp className="h-[50%] w-[50%] m-1 p-1" />

          </button>


        </div>
        :
        <>
          <div className="w-full h-[10%] flex border border-opacity-20 border-gray-500 rounded-xl  p-1">
            <input ref={searchInput} onChange={searchUser} value={searchText} className="p-4 focus:outline-none focus:outline-gray-600 rounded-xl h-full w-full bg-transparent" type="text" />
            <button className="w-20 h-full p-5">
              <FaSearchengin className="h-full w-full" />
            </button>
          </div>
          <div className="border mt-2 border-opacity-20 border-gray-500 p-1 rounded-xl overflow-scroll h-[30%]">

            {contact?.map((item) => (
              <div key={item.email} onClick={() => { item.firstName === user.firstName ? setUser({}) : getConversation(item.email); setUser(item); setSelectedUser(item.email); item.role == 'student' ? SetStudent({ status: true, user: item.email }) : SetStudent({ status: false, user: item.email }) }} className={`${!checkOnline(item.email) ? 'text-opacity-50' : ''} rounded-xl cursor-pointer bg-opacity-30 ${item.email == selectedUser ? 'bg-blue-400' : 'bg-gray-500 bg-opacity-5 '} rounded-sm `}>
                <div className="m-1 h-[50px] flex text-start justify-between">
                  <div className="flex items-start p-2">
                    <div className={`${!checkOnline(item.email) ? 'bg-opacity-40' : ''} w-10 me-2 shadow-md h-[100%] rounded-full bg-blue-500   overflow-hidden`}>
                      <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${item?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                    </div>
                    <div className={`${checkOnline(item.email) ? 'text-green-400' : 'text-red-400'}`}>
                      <MdOnlinePrediction className="h-full" />
                    </div>
                    <button onClick={() => { }} className={`text-1xl `}>{item?.firstName}</button>
                  </div>
                  <div className="flex">
                    <button className="mx-3 text-green-500"><IoChatbubbleEllipsesOutline /></button>
                    <button className="mx-3 text-green-500"><MdVideoCameraBack /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      }
      <div className="h-[60%]   mt-5 overflow-scroll border border-opacity-10 p-1 border-gray-500 rounded-xl bg-opacity-15">
        {Object.keys(user).length ?
          <SingleChat onChange={setReal} startCall={dialACall} sendMessage={sendMessage} chatHead={conversation} user={user} userChat={real} />
          : ''}
      </div>
    </div>
  );
};

export default ChatBox;
