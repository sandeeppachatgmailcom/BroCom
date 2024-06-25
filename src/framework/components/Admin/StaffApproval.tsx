import { useEffect, useState } from "react"
import axiosApi from "../../api/axios";
import AdminStaffApproval from "./AdminStaffApproval"
import { RiDeleteBin5Line } from "react-icons/ri";
import { adminApis } from "../../../entity/constants/api";
import { ApproveStaff_Model } from "../../../entity/components/admin/ApproveStaffComponent";
import useGetActiveUsers from "../../../useCases/useGetActiveUsers";
import { UserEntity_Model } from "../../../entity/response/userModel";
const ApproveStaff = (_props:ApproveStaff_Model)=>{
    //const [user,setUser ]= useState([])
    const [pageCount,setPageCount] = useState(1)
    const [menu,setMenu] = useState(0)
    const[selectedStaff,setSelectedStaff] = useState()
    const user :UserEntity_Model[] = useGetActiveUsers()||[]
// const getUsers = async ()=>{
//     const user = await axiosApi.get(adminApis.listAllstaffpendingApprovals) 
//         console.log(user?.data,'helo users welcome to approval page')
//         setUser(user.data)
      
// }

const deleteProfile=async (item:any)=>{
    const data = {
        ...item,
        deleted:true,
        role:'user',
        active:false,
        admin:false,
        trainer:false,
    }
    const deleted =  data?.deleted? await axiosApi.post(adminApis.approveStaff, data):''
    console.log(deleted,'deleteddeleteddeleted')
   // await  getUsers();
}




// useEffect(()=>{
//     getUsers();
// },[])

 
useEffect(()=>{
    console.log(pageCount,'pagecount')
},[pageCount]) 
     

 


    return (
         
             
                <div className="block  xl:flex  bg-opacity-20 shadow-xl   border border-opacity-10 border-blue-400 rounded-lg mt-1 p-1 w-full">
                    <div className="      block m-1 lg:w-full  xl:w-3/12 w-full     md:w-full  overflow-scroll  me-1 border-r-blue-600  border-e-2    border-gray-300 border-opacity-20 ">
                        <div className="flex flex-wrap md:flex-col   m-1     ">
                        {user && user?.map((item :any, index :number) => {
                        if (index > (((pageCount-1)*5)) && index <= pageCount*5)  return <div  onClick={() =>{setMenu(index);console.log(item);setSelectedStaff(item)   } } className={menu == index ? ` items-center shadow-blue-500 shadow-md  w-full xl:w-5/6  text-blue-800 xl:rounded-e-full   bg-blue-200 flex m-1  font-bold   p-2  `  : ' w-[90%] justify-start p-2 items-center text-left  flex m-1 rounded h-[60px] cursor-pointer '} >
                                    <div  style={{backgroundImage:`url(${item.profileImage})`,backgroundPosition:'center',backgroundSize:'cover'}}  className="justify-self-center bg-gray-500 bg-opacity-15 m-1 h-10 w-10 rounded-full shadow-gray-400 ">
                                
                                    </div>
                                <button className="" onClick={() =>{setMenu(index);console.log(item);setSelectedStaff(item)   } } key={index} > {item.firstName.toUpperCase()}  {menu == index ?<button onClick={()=>{deleteProfile(item)}} className="  "><RiDeleteBin5Line /> </button>:''}  </button> 
                            </div>

                        })}
                        </div>
                        <div className="flex h-[40px] m-1 items-centerm-1    ">
                            <div className="flex items-center w-full m-1  ">
                                
                            {(() => {
                                    const count = Math.ceil(user?.length/5)
                                    let outArray = []
                                    for (let i = 1; i <= count; i++) {
                                        outArray.push(<button  key={i} onClick={() => {setPageCount(i);setMenu(((i*4)-3));} } className={  ` ${i==pageCount ?  'ms-1 border rounded font-semibold shadow-lg  text-white bg-blue-400 w-5':'ms-1 border rounded font-semibold text-blue-400 w-5 '} w-[30px] h-[40px]  ` } >{i}</button>)
                                    }
                                    return outArray
                                }
                                )()
                                }
                                
                            </div>
                        </div>
                    </div>
                    <div className="  m-1   md:flex-col w-full flex justify-center items-center sm:w-full  md:w-fullg:w-4/6   overflow-scroll  border-gray-300 border-opacity-70      rounded-xl">
                        { selectedStaff? <AdminStaffApproval staff={selectedStaff}/>:''}
                    </div>
    
                </div> 
        
        


    )
}

export default ApproveStaff