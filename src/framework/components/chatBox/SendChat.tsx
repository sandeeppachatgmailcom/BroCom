import { useState } from "react";
import { IoSend } from "react-icons/io5"; 
const SendChat = ()=>{

    const[sendData ] = useState<any>({})
   


    return(
        <div className="w-full h-[90%] m-1 flex rounded-xl">
                    <input value={sendData.SenderMessage} name='SenderMessage' className="focus:outline-none focus:outline-gray-600 rounded-xl border-opacity-40  border-gray-600 border   h-full w-full bg-transparent flex " type="text"  id="" />  
                        <button className="w-20 h-full p-5">
                        <IoSend  className="h-full w-full" />
                        </button>
        </div>
    )

}

export default SendChat