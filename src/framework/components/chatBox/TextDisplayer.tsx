const TextDisplay = ({ activeUser, user, userChat }:any) => {
    return (
        <>
            {userChat.map((item:any,index:any) => {

                return (item.senderId == activeUser.email ? (
                        <div key={index} className="h-auto self-end text-end    flex flex-col rounded-e-none rounded-t-xl rounded-s-xl bg-green-900 bg-opacity-20 justify-end m-1 flex-wrap  p-3 ">
                        <small className="">{activeUser.firstName + ' ' + activeUser.lastName}</small>
                        <p className="flex flex-wrap justify-end text-end w-full text-wrap overflow-wrap: break-word">{item.senderMessage} {item.receiverMessage}</p>
                        </div>) 
                        :
                        (<div key={index}  className="h-20   self-start rounded-xl bg-blue-900  bg-opacity-20 rounded-s-none rounded-t-xl flex flex-col justify-start m-2 flex-wrap   p-2">
                        <small>{user?.firstName}</small>
                        <p className="flex flex-wrap justify-end text-start w-full text-wrap overflow-wrap: break-word">{item.receiverMessage}  {item.senderMessage}</p>

                    </div>))

            })}
        </>
    )
}

export default TextDisplay