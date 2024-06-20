import { useState } from "react"
import { useSelector } from "react-redux"

const Resume = () => {
    const [color, setColor] = useState('')
    const [verticalColor, setVerticalColor] = useState('')
    const activeUser = useSelector((state:any) => state.activeUser.user)

    return (
        <div className="flex flex-col  h-[100%] border w-full">
            <div className=" w-full flex justify-end">
                <button onClick={() => { setColor('bg-red-800   '); setVerticalColor('bg-red-200') }} className="h-10 w-10 bg-red-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-green-950   '); setVerticalColor('bg-green-200') }} className="h-10 w-10 bg-green-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-gray-700   '); setVerticalColor('bg-gray-200') }} className="h-10 w-10 bg-gray-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-yellow-500   '); setVerticalColor('bg-yellow-200') }} className="h-10 w-10 bg-yellow-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-blue-900   '); setVerticalColor('bg-blue-200') }} className="h-10 w-10 bg-blue-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-indigo-500   '); setVerticalColor('bg-indigo-200') }} className="h-10 w-10 bg-indigo-500 rounded-full p-2 m-1"> </button>
                <button onClick={() => { setColor('bg-yellow-800  '); setVerticalColor('bg-yellow-200') }} className="h-10 w-10 bg-yellow-800 rounded-full p-2 m-1"> </button>
            </div>
            <div className="flex flex-col h-[100%] rounded-2xl border w-full relative">

                <div className={`flex flex-col justify-end items-center w-full h-[30%] rounded-t-xl ${color}`}>
                    <div className="text-5xl text-right p-3 w-full break-words">
                        {activeUser.firstName} {' '} {activeUser.lastName}
                    </div>
                    <div className="text-2xl text-right p-3 w-full break-words">
                        {activeUser.designation}
                    </div>
                </div>

                <div className=" flex flex-col justify-end w-full h-[80%]">
                    <div className="w-10/12 border flex flex-col">
                        <div className="w-4/6 bg-gray-800 bg-opacity-10 p-2 m-4 rounded-xl flex justify-end   h-[20%]" >
                            <h1 className={`${color} bg-opacity-10 text-gray-800 p-2 font-semibold  rounded-xl  w-full text-start text-xl `} >PROFILE INFO ----------------- </h1>
                        </div>
                        <div className="w-4/6 bg-gray-800 bg-opacity-10 p-2 m-4 rounded-xl flex justify-end   h-[20%]" >
                            <h1 className={`${color} bg-opacity-10 text-gray-800 p-2 font-semibold  rounded-xl  w-full text-start text-xl `} >PROFILE INFO ----------------- </h1>
                        </div>
                    </div>
                </div>

                <div className={`rounded-t-full ${verticalColor}  ms-12 mt-8 absolute w-2/12 m-4 p-1 overflow-hidden h-full`}>
                    <div className={`relative ${color} border border-gray-500 border-opacity-25 rounded-full w-50  h-60  m-3`}>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Resume