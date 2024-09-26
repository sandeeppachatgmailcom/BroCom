import {   useCallback, useEffect, useRef, useState } from "react";
import { MdVideoCameraBack, MdOnlinePrediction } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaSearchengin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import axiosApi from "../../api/axios";
import { chatApi } from "../../../entity/constants/api";
import { Socket, io } from 'socket.io-client';
import { updateChatUser } from "../../ReduxStore/activeChatuser";
import useContactList from "../../../useCases/useContactList";
import SingleChat from "./SingleChat";
import { IoPersonAddSharp } from "react-icons/io5";
import { FcVideoCall } from "react-icons/fc";
import { toggleMultiUser } from "../../ReduxStore/multipleUser";

  const ChatBox = ({ setStudent }: any) => {
  const multipleUser = useSelector((state:any) => state.multiUser.show)
   
  const [real, setReal] = useState<any>([]);
  const [conversation, setConversation] = useState({});
  const activeUser = useSelector((state: any) => state.activeUser.user);
  const [videoCallList ] = useState([])
  const [user, setUser] = useState<any>({});
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef<HTMLDivElement|any>();
  const contact = useContactList(searchText);
  const [usersList, setUsersList] = useState([])
  const [initialSocket, setInitialSocket] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState('')
  
  const [activeCalls,setActiveCalls] = useState<any>([]) 
  const [socket, setSocket] = useState<Socket | null|any>(null);
   
  
  useEffect(() => {
    console.log('Attempting to establish socket connection');

    const newSocket = io('wss://growcom.onrender.com', {
      transports: ['websocket'],
      upgrade: true,
    });

    console.log('Socket instance created:', newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    newSocket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    setSocket(newSocket);

    // return () => {
    //   console.log('Cleaning up socket connection');
    //   if (newSocket) {
    //     newSocket.disconnect();
    //   }
    // };
  }, []);

  // always update the list of onlineuserd , ueseeffect will work when ever change founde the varibales in dependancy
  useEffect(() => {
    const userList:any = contact?.map((user:any) => ({
      ...user,
      online: onlineUsers.some((online:any )=> user.email === online.userId)
    })).sort((a, b) => b.online - a.online);
     
    if (userList?.length) {
      setUsersList(userList);
    }
  }, [onlineUsers, contact, socket]);

  useEffect(() => {
    const tempUserList:any = usersList.map((user:any) => {
      return {
        ...user,
        activeCall: activeCalls.some((active:any) => active.from === user.email),
        offer: activeCalls.filter((active:any) =>  active.from === user.email ?active.offer:null   )[0]?.offer 
      };
    });
    
  setUsersList(tempUserList);
     activeCalls.map((activeCall:any)=>{
      
      if(activeCall.from === user.email){
        setUser({
          ...user,
          activeCall:true,
          offer:activeCall.offer 
        })
      }
     }) 
  },[activeCalls]);
  //updating users list to identify call waiting 
  useEffect(() => {
    const userList:any = usersList.map((user:any) => ({
      ...user,
      incomingCall: videoCallList.some((caller:any) => user.email === caller.email),
    }));

    setUsersList(userList);
  }, [videoCallList]);
  const handleAddUser =()=>{
  }
  // handling the logout and new connection when user changes 
  useEffect(() => {
    if (!Object.keys(activeUser)?.length) {
      socket?.emit("logout");
    } else {
      socket?.emit("addUser", { userid: activeUser.email });
    }
  }, [activeUser, socket]);
  // updating the user oncall
  useEffect(() => {

    dispatch(updateChatUser(user));
  }, [user, dispatch]);
  const handleUsersOnline = (message:any) => {
    console.log(message,'online users')
    setOnlineUsers(message);
  };
  const handleSendMessage = (message:any) => {
    if (message.receiverId === activeUser.email) {
      setReal( (prevReal:any) => [message, ...prevReal]);
    }
  };
  
    
  const checkOnline = (email:any) => {
    return onlineUsers.some((online:any) => email === online.userId);
  };
  const endCall = (message:any) => {
    socket.emit("endCall", message)
  }
   
    
  const sendMessage = (message:any) => {
    socket?.emit("send-message", message);
  };
  const dialACall = (message:any) => {
    socket.emit("dialACall", { message })
  }
  const getConversation = async (receiverEmail:any) => {
    const data = {
      senderId: activeUser.email,
      receiverId: receiverEmail
    };
    const chat = await axiosApi.post(chatApi.intiateConversation, data);
    setConversation(chat.data.conversation);
    setReal(chat?.data?.messages);
  };
  const opennewTab = () => {

    window.open(`https://sandeeppachat.in//role`, '_blank');
    dispatch(toggleMultiUser())
  }
  const searchUser = (e:any) => {
    const { value } = e.target;
    setSearchText(value);
  };
  const handleIncommingCall = useCallback(
    async ({ from, offer }:{ from:any, offer:any }) => {
      const temp:any = activeCalls
      temp.push({from,offer}); 
      setActiveCalls([...temp])   
       
     },
    [socket]
  ); 


  useEffect(() => {
    if (initialSocket) {
      socket?.emit("addUser", { userid: activeUser.email });
      setInitialSocket(false);
    }
    socket?.on("usersOnline", handleUsersOnline);
    socket?.on("addUser", handleAddUser);
    socket?.on("send-message", handleSendMessage);
    socket?.on("user:callRequest",handleIncommingCall)
     
    return () => {
      socket?.off("usersOnline", handleUsersOnline);
      socket?.off("addUser", handleAddUser);
      socket?.off("send-message", handleSendMessage);
      socket?.off("user:callRequest",handleIncommingCall)
      // if (socket) {
      //   socket.close();
    
    };
  }, [socket, initialSocket, activeUser.email, usersList]);

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

            {usersList?.map((item:any) => {
             
              if (item?.email != activeUser?.email) return <div key={item?.email}  onClick={() => { item.firstName === user.firstName ? setUser({}) : getConversation(item?.email); setUser(item); setSelectedUser(item?.email); item.role == 'student' && activeUser.role != 'student' ? setStudent({ status: true, user: item?.email }) : setStudent({ status: false, user: item?.email }) }} className={`${!checkOnline(item?.email) ? 'text-opacity-50' : ''} rounded-xl cursor-pointer bg-opacity-30 ${item.email == selectedUser ? 'bg-blue-400' : 'bg-gray-500 bg-opacity-5 '} rounded-sm `}>
                <div className="m-1 h-[50px] w-full items-center flex text-start justify-between">
                  <div className="flex w-7/12 h-[100%]  items-start p-2">
                    <div className={`${!item?.online ? 'bg-opacity-40' : ''}    w-10 me-2 shadow-md h-[100%] rounded-full bg-blue-500   overflow-hidden`}>
                      <div className="h-[100%] w-[100%] rounded-full" style={{ backgroundImage: `url(${item?.profileImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }} />
                    </div>
                    <div className={`${item?.online ? 'text-green-400' : 'text-red-400'}`}>
                      <MdOnlinePrediction className="h-full" />
                    </div>
                    <button onClick={() => { }} className={`text-1xl `}>{item?.firstName}</button>
                  </div>
                  <div className="w-2/12 flex   overflow-hidden items-center h-full">
                    {item?.activeCall ? <FcVideoCall className="animate-pulse h-[100%] w-[100%]" /> : ''}
                  </div>
                  <div className="flex w-3/12">
                    <button className="mx-3 text-green-500"><IoChatbubbleEllipsesOutline /></button>
                    <button className="mx-3 text-green-500"><MdVideoCameraBack /></button>
                  </div>
                </div>
              </div>
            
            })}
          </div>
        </>
      }
      <div className="h-[60%]   mt-5 overflow-scroll border border-opacity-10 p-1 border-gray-500 rounded-xl bg-opacity-15">

        {Object.keys(user)?.length ?
          <SingleChat socket={socket}       onChange={setReal} endCall={endCall} startCall={dialACall} sendMessage={sendMessage} chatHead={conversation} user={user} userChat={real} />
          : ''}
      </div>
    </div>
  );
};

export default ChatBox;
