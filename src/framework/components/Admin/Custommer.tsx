
import UploadImageDocument from "../utilComponents/UploadImage";
import { TfiEmail } from "react-icons/tfi";
import { FaPhoneVolume } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";
import { FaBuildingColumns } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { PiCity } from "react-icons/pi";
import { FaSignsPost } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { FaSortNumericUp } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import useGenerateDate from "../../../useCases/useGenerateDate";
import useGetAddressFromPincode from "../../../useCases/useGetaddressFromPincode";
import axiosApi from "../../api/axios";
import { userApi, utilityApis } from "../../../entity/constants/api";
import { ToastContainer, toast } from "react-toastify";

interface User {
    _id?:string;
    firstName?: string;
    dateOfBirth?: Date ;
    houseName?: string;
    houseNumber?: string;
    streetName?: string;
    city?: string;
    pincode?: string;
    isAdmin?: boolean;
    active?: boolean;
    mob?: string;
    email?: string;
    web?: string;
    role?: "customer" | "admin" | "student" | "trainer";
    deleted?: boolean;
    verified?: boolean;
    profileImage?: string;
    admin?: boolean;
    user?: boolean;
    student?: boolean;
    trainer?: boolean;
    otpVerified?: boolean;
    batchId?: string;
    week?: string;
    designation?: string;
}
const initial_State = {
    firstName: '',
    dateOfBirth: '',
    houseName: '',
    houseNumber: '',
    streetName: '',
    city: '',
    pincode: '',
    isAdmin: false,
    active: true,
    mob: '',
    email: '',
    web: '',
    role: "customer",
    deleted: false,
    verified: false,
    profileImage: '',
    admin: false,
    user: false,
    student: false,
    trainer: false,
    otpVerified: false,
    batchId: '',
    week: 'nil',
    designation: 'custommer',
}

const Custommer = () => {
    const [formData, setFormData] = useState<User>(initial_State);
    const createDate = useGenerateDate()
    const picodeToaddress = useGetAddressFromPincode()
    const [address, setAddress] = useState([])
    const [state,setState] = useState([])
    const [alert,setAlert] = useState()
    const fetchAddress = async (pincode: string) => {
        const data = await picodeToaddress(pincode)
        console.log(data, 'datadata')
        setAddress(data)
    }

    useEffect(()=>{
        const uniqueStates = address.reduce((acc: any[], item: any) => {
            if (!acc.some(state => state.State === item.State)) {
              acc.push(item);
            }
            return acc;
          }, []);
          console.log(uniqueStates,'state')
          setState( uniqueStates )
     
    },[address])



    const handleChange = (e: any) => {
        const { value, name } = e.target;
        
        setFormData({
            ...formData,
            [name == 'uploadedImageUrl' ? 'profileImage' : name]: value
        })
    }

    useEffect(() => {
        console.log(formData, 'formData')
        if (formData?.pincode?.length > 5) {
            fetchAddress(formData?.pincode)
            
        }
    }, [formData])
    const updaloadDocument =async ()=>{
        console.log(formData,Object.keys(formData))
        let result = '' 
        Object.keys(formData).sort().map((item:string)=>{
             if(formData[item]==='') {result+= item+' ,'}
        })
        console.log(result)
        if(result.length){
            setAlert(result)
        }
        if(!formData?._id){
            console.log('reached here ',formData)
            const data = await axiosApi.post(utilityApis.getuserDetailsByEmail,{email:formData.email})    
            console.log(data.data )
            setFormData(data.data)
            if(data.data) toast.error('user already exist')
            const saveUser = await axiosApi.post(userApi.saveBasicProfile,formData)
            console.log(saveUser,'saveUser')        
        }
        else{
            console.log('in else part')
            const saveUser = await axiosApi.post(userApi.saveBasicProfile,formData)
            console.log(saveUser,'saveUser')        
        }

        

    }
    return (
        <div className="flex flex-col w-full h-[100%]   rounded-xl bg-blue-100 bg-opacity-5">
        <ToastContainer/>
            <div className="border-b-2 h-[25%] flex items-center justify-start  ">
                <div className="flex    w-2/12 h-[100%] m-2 items-center justify-start  relative   ">
                    <div className="m-1 justify-center items-center flex w-[90%] h-[90%] rounded-2xl bg-violet-800 absolute      ">
                        {/* <h1 className="text-8xl text-violet-200" > S </h1> */}
                        <UploadImageDocument height={'100%'} width={'100%'} changebutton={true} value={formData.profileImage} name='profileImage' onSaveClick='' onChange={handleChange} />
                    </div>

                </div>
                <div className="flex p-3 flex-col  w-9/12 h-[100%]     items-start justify-center   ">
                    {alert ? <h1>{alert} </h1>:'' }
                    <input placeholder="Sandeep Pazchat" name="firstName" value={formData.firstName} onChange={(e) => handleChange(e)} className="h-20 ms-1 text-5xl  w-full focus:outline-none focus:outline-violet-200 rounded-md font-semibold bg-transparent " type="text" />
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <SlCalender className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="dateOfBirth" value={formData?.dateOfBirth || createDate(new Date(Date.now()))} type='date' className="h-10 ms-1  focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " />
                    </div>
                </div>
                <div className="flex p-3 flex-col  w-1/12 h-[100%]    items-start justify-center   ">

                    <FaCloudUploadAlt onClick={()=>{updaloadDocument()}} className="w-10 hover:bg-violet-400 hover:text-white rounded-2xl h-10 bg-violet-200  bg-opacity-55 m-1 p-2 " />

                </div>


            </div>

            <div className=" w-full  flex  ">
                <div className="flex p-1  w-full xl:w-4/12 flex-col  items-start justify-start   ">
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <TfiEmail className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="email" value={formData?.email} placeholder="Email" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>
                    <div className="flex p-1     w-full items-center justify-start   ">
                        <FaPhoneVolume className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input style={{ WebkitAppearance: 'none', MozAppearance: 'textfield' }} onChange={(e) => handleChange(e)} name="mob" value={formData?.mob} placeholder="Contact number " className="appearance-none  h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600   border-opacity-10 " type="number" />
                    </div>
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <CgWebsite className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="web" value={formData?.web} placeholder="Website" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>

                </div>
                <div className="flex p-1  w-full xl:w-4/12 flex-col  items-start justify-start   ">
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <FaBuildingColumns className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="houseName" value={formData?.houseName} placeholder="Building Name" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <FaSortNumericUp className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="houseNumber" value={formData?.houseNumber} placeholder="Building Number" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>
                    <div className="flex p-1     w-full items-center justify-start   ">
                        <IoLocation className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="streetName" value={formData?.streetName} placeholder="Street" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>


                </div>
                <div className="flex p-1  w-full xl:w-4/12 flex-col  items-start justify-start   ">
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <FaSignsPost className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <input onChange={(e) => handleChange(e)} name="pincode" value={formData?.pincode} placeholder="pincode" className="h-10 ms-1 w-full focus:outline-none focus:outline-violet-200 rounded-md bg-violet-200 bg-opacity-5 border border-gray-600  border-opacity-10 " type="text" />
                    </div>
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <PiCity className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <select className={`   bg-transparent bg-violet-200 bg-opacity-5  h-10   border-gray-600  border-opacity-10      text-left    w-10/12 focus:border-gray-400 focus:outline-none`}
                            onChange={(e) => handleChange(e)}
                            name="city" 
                            id="id_City" >
                            {
                                address.length && address?.map((item: any) => <option className="bg-transparent text-black " selected={item.Name == formData?.city} value={item?.Name}>{item?.Name}</option>)
                            }
                        </select>
                    </div>
                    <div className="flex p-1    w-full items-center justify-start   ">
                        <BiSolidCategoryAlt className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <select className={`   bg-transparent bg-violet-200 bg-opacity-5  h-10   border-gray-600  border-opacity-10      text-left    w-10/12 focus:border-gray-400 focus:outline-none`}
                            onChange={(e) => handleChange(e)}
                            name="batchId" 
                            id="id_City" >
                            {
                                address.length && address?.map((item: any) => <option className="bg-transparent text-black " selected={item.Name == formData?.city} value={item?.Name}>{item?.Name}</option>)
                            }
                        </select>
                    </div>

                    {/* <div className="flex p-1     w-full items-center justify-start   ">
                        <BsFillFlagFill className="w-10 rounded-2xl h-10 bg-violet-200 bg-opacity-55 m-1 p-2 " />
                        <select className={`  bg-violet-200 bg-opacity-5  h-10   text-left   w-10/12  focus:outline-none`}
                            onChange={(e) => handleChange(e)}
                            name={formData.}
                            id="id_City" >
                            {   
                                state.length && state?.map((item: any) =>{
                                      return  <option className="bg-transparent text-black " selected={item.State == formData?.State} value={item?.State}>{item?.State}</option>     
                                })
                            }
                        </select>
                    </div> */}


                </div>




            </div>
        </div>
    )
}

export default Custommer