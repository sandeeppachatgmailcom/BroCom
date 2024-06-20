import { useState } from "react"
import { TrainerMenuPanel_Component } from "../../../entity/components/trainer/trainerMenuPanel"

const TrainerMenuPanel=(props:TrainerMenuPanel_Component)=>{
    const [activeTab,setActiveTab] = useState<any>()
    const setSelectedMenu = (menu:string)=>{
        props.setSelectedMenu(menu)
        setActiveTab(menu)
    } 

    return(
        <div className="w-full   flex rounded-md    shadow-gray-300 justify-end">
             <button className={` ${activeTab==='All'? 'bg-blue-400':' border border-gray-600 border-opacity-40'  }  m-1 rounded-md focus:outline-none  p-1 w-[150px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400 font-semibold ` } onClick={()=>setSelectedMenu('All')} > ALL </button>
             <button className={` ${activeTab=='pending'? 'bg-blue-400':' border border-gray-600 border-opacity-40'  }  m-1 rounded-md focus:outline-none  p-1 w-[150px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400 font-semibold `} onClick={()=>setSelectedMenu('pending')} > PENDING </button>
             <button className={` ${activeTab=='Approval'? 'bg-blue-400':' border border-gray-600 border-opacity-40'  }  m-1 rounded-md focus:outline-none  p-1 w-[150px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400 font-semibold `} onClick={()=>setSelectedMenu('Approval')} > SUBMISSION </button>
             <button className={` ${activeTab=='rate'? 'bg-blue-400':' border border-gray-600 border-opacity-40'  }  m-1 rounded-md focus:outline-none  p-1 w-[150px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400 font-semibold `} onClick={()=>setSelectedMenu('rate')} > WORK LOG </button>
             <button className={` ${activeTab=='dashBoard'? 'bg-blue-400':' border border-gray-600 border-opacity-40'  }  m-1 rounded-md focus:outline-none  p-1 w-[150px] h-[50px] shadow-sm hover:bg-blue-400 hover:shadow-blue-400 font-semibold `} onClick={()=>setSelectedMenu('dashBoard')} > DASH BOARD </button>
        </div>
    )
}



export default TrainerMenuPanel

