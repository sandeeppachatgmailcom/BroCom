import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import ProfileImageBox from "../../framework/components/header/ProfileImageBox"
import { useNavigate } from "react-router-dom"
import MenuBar from "../../framework/components/header/MenuBar"
import axios from "axios"
import axiosApi from "../../framework/api/axios"
import  { login } from "../../framework/ReduxStore/activeUser"
import { publicApi, userApi } from "../../entity/constants/api"
import Academics from "../../framework/components/user/Academics"

import { ToastContainer, toast } from "react-toastify"
import useCompareObjects from "../../useCases/useCompareObjects"
import useGetLogin from "../../useCases/useGetLogin"
import { UserEntity_Model } from "../../entity/response/userModel"







const ProfilePage = (_props: any) => {
    const theme = useSelector((state: any) => state.theme.theme)
    const darkTheme = useSelector((state: any) => state.theme)
    const user: UserEntity_Model = useSelector((state: any) => state.activeUser.user)

    const dispatch = useDispatch()
    const [border,] = useState('none')
    const navigate = useNavigate();
    const [address, setAddress] = useState([])
    const [formData, setFormData] = useState(user)
    const changes = useCompareObjects(user, formData)
    const [promoCode,setPromoCode] = useState<{promoCode:string,email:string}>({promoCode:'',email:''})
    const handlePromotion =  (e:any)=>{
        const {name,value} = e.target;
        setPromoCode({
            ...promoCode,
            [name]:value
        })
    } 

    const applyPromotionCode =async()=>{
        console.log(promoCode,userApi.applyPromocode,'promoCode')
        const result = await axiosApi.post(userApi.applyPromocode,promoCode)
        console.log(result.data,'result.dataresult.data')
        if(result.data){
            const newUser = JSON.parse(JSON.stringify(user))  
            newUser.role = result.data.role
            dispatch(login(newUser))
            toast.success(result.data.messsage)
        }
        else{
            toast.error(result.data.message)
        }
    }


    const loadAddress = async () => {

        const address = await axios.get(`${publicApi.getPincode}${formData.pincode}`)
        setAddress(address.data[0].PostOffice)
    }
    const getUser = async () => {
        const role = document?.cookie
            .split(';').map((item) => item.split('=')).filter((item) => item[0].trim().startsWith('man'))[0][0] || false;
        if (role) {
           
            const responce = await axiosApi.get(userApi.getlogin + `/${role.trim()}`)
             
            responce.data.success == true ? dispatch(login(responce.data)) : navigate('/signin')
        }
        else {
            navigate('/signin')
        }

    }

    const divert = async () => {

        if (document.cookie.split(';').map((item) => item.split('=')).filter((token) => token[0].trim().startsWith('man')).length > 1) {
            navigate('/role')
        }
        else if (document.cookie.split(';').map((item) => item.split('=')).filter((token) => token[0].trim().startsWith('man')).length == 1) {
            getUser()
        }
        else if (!Object.keys(user).length) {
            navigate('/signin')
        }
        else {

            if (user.role == 'student') {
                useGetLogin('manGrowstudent')
            }
            else if (user.role == 'trainer') {
                useGetLogin('manGrowtrainer')
            }
            else if (user.role == 'admin') {
                useGetLogin('manGrowadmin')
            }
        }


    }




    useEffect(() => {

        if (Object.keys(user).length) {
            setFormData(user)
            setPromoCode({
                ...promoCode,
                email:user.email
            })

        }
        else {
            divert()
        }
    }, [user])



    const handleChange = (e: any) => {
        const { name, value } = e.target

        setFormData({
            ...formData,
            [name]: value

        }

        )

    }




    const SavePetsonalinfo = async () => {
        try {
             
            if (!changes) {
                const savedUser = await axiosApi.post(userApi.saveBasicProfile, formData)
                if (!savedUser.data.status) {
                    toast.error(savedUser.data.message)
                }
                else {
                    dispatch(login(savedUser.data))
                    toast.success(savedUser.data.message)
                }
            }
            else {
                toast.error("No Changes Found")
            }
        } catch (error: any) {
            toast.error(error)
        }
    }


    useEffect(() => {
        if (formData?.pincode?.length > 5) {
            loadAddress()
        }
    }, [formData])

    

    return (
        <>
            {Object.keys(user).length ?
                <div className="  w-full md:flex  h-[100%]" >
                    <div className="xl:block flex md:flex-col  w-full md:w-1/4 lg:w-2/12    border-e-8    border-blue-800 justify-center items-start p-2 bg-blue-500 bg-opacity-5 border-opacity-15 rounded-xl mt-2">
                        <MenuBar />
                        <ToastContainer />
                    </div>
                    <div className="overflow-y-scroll h-[100%] w-5/6 relative block md:flex border border-blue-800 border-opacity-10 ms-1 bg-transparent p-2 bg-blue-500 bg-opacity-5   rounded-xl mt-2   ">
                              
                            <div className=" lg:w-2/6 xl:w-1/6 flex   top-10 m-10  flex-col    h-[50%] items-center  overflow-hidden ">
                                <ProfileImageBox  changebutton={true} height='h-[200px]' width='w-[200px]' />
                            {(user.role == 'user') ?
                            <>
                                <input name="promoCode" type="text"  value={ promoCode.promoCode} onChange={(e)=>handlePromotion(e)} placeholder="Promo Code" className="  focus:outline-none font-bold text-3xl uppercase text-center w-full h-20 rounded bg-transparent border-blue-950 border  border-opacity-55   " />   
                                <button onClick={()=>applyPromotionCode()} className="w-full rounded-lg bg-blue-400 text-white font-bold h-10 m-1" > APPLY CODE </button>
                            </>:''
                            }
                                 
                            </div>
                            <div className={`p-4 md:w-full xl:w-5/6  flex-wrap sm:block rounded-xl items-center justify-between  `}>
                                <div className="   block sm:w-full xl:flex p-1 items-center justify-center" >
                                    
                                    <div className={`${theme} p-2  block w-full justify-center items-center rounded-xl m-1 `}>
                                        <div className="justify-center   rounded-2xl  ">

                                            <h5 className=" text-2xl text-center  "> Basic info   </h5>
                                            {/* <h1  className=" text-center " >{Object.keys(formData).length ? formData?.batch[0]?.batchName?.toUpperCase():''}</h1>     */}
                                            {user.role == 'user' ? <h1 className="text-blue-500 text-center text-2xl"> You profile is waiting for approval from admin, you can change your profile details now!!</h1> : ''}
                                            <div className="border border-blue-800 border-opacity-10 bg-transparent block bg-yello h-100  w-full  lg:flex justify-center text-center" >
                                                <div className="border border-blue-800 border-opacity-10 bg-transparent w-full lg:w-2/6  block">
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent  m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left ' htmlFor="">Name</label>

                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none   rounded-sm     w-3/4   text-left   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.firstName}
                                                            name="firstName"
                                                            id="id_firstName" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">Last Name</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none    text-left  rounded-sm  w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.lastName}
                                                            name="lastName"
                                                            id="id_lastName" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">Father </label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none    text-left  rounded-sm  w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.fatherName}
                                                            name="fatherName"
                                                            id="id_fatherName" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">Mother</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}   appearance-none    text-left  rounded-sm  w-3/4  border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.motherName}
                                                            name="motherName"
                                                            id="id_motherName" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left ' htmlFor="">dateOfBirth</label>

                                                        <input type="date" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none   rounded-sm     w-3/4   text-left   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.dateOfBirth as any}
                                                            name="dateOfBirth"
                                                            id="id_dateOfBirth" />
                                                        <br />
                                                    </div>
                                                </div>
                                                <div className="border border-blue-800 border-opacity-10 bg-transparent w-full lg:w-2/6  block">


                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">Email</label>
                                                        <input type="text" readOnly onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}   appearance-none    text-left  rounded-sm  w-3/4  border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.email}
                                                            name="email"
                                                            id="id_email" />
                                                        <br />
                                                    </div>

                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className="w-1/4 text-left" htmlFor="">Phone</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none     text-left rounded-sm w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.mob}
                                                            name="mob"
                                                            id="id_mob" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className="w-1/4 text-left" htmlFor="">web</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none     text-left rounded-sm w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.web}
                                                            name="web"
                                                            id="id_web" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-2/4 text-left ' htmlFor="">House num</label>

                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none   rounded-sm     w-3/4   text-left   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.houseNumber}
                                                            name="houseNumber"
                                                            id="id_houseNumber" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-2/4 text-left ' htmlFor="">House name</label>

                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none   rounded-sm     w-3/4   text-left   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.houseName}
                                                            name="houseName"
                                                            id="id_houseName" />
                                                        <br />
                                                    </div>
                                                </div>
                                                <div className="border border-blue-800 border-opacity-10 bg-transparent w-full lg:w-2/6  block">
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">streetName</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none    text-left  rounded-sm  w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.streetName}
                                                            name="streetName"
                                                            id="id_streetName" />
                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className='w-1/4 text-left' htmlFor="">city</label>
                                                        <select className={`${darkTheme.inputtext}   appearance-none    text-left    w-3/4  border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            onChange={(e) => handleChange(e)}
                                                            name="city"
                                                            id="id_City" >
                                                            {
                                                                address?.map((item: any) => <option selected={item.Name == user.city} value={item.Name}>{item.Name}</option>)
                                                            }
                                                        </select>

                                                        <br />
                                                    </div>
                                                    <div className="flex text-center border border-blue-800 border-opacity-10 bg-transparent m-1 rounded-sm h-10 items-center  justify-between p-1">
                                                        <label className="w-1/4 text-left" htmlFor="">pincode</label>
                                                        <input type="text" onChange={(e) => handleChange(e)}
                                                            className={`${darkTheme.inputtext}  appearance-none     text-left rounded-sm w-3/4   border-${border}  focus:border-gray-400 focus:outline-none`}
                                                            value={formData.pincode}
                                                            name="pincode"
                                                            id="id_pincode" />
                                                        <br />
                                                    </div>

                                                    <div className="flex justify-end ">
                                                        <button onClick={() => { SavePetsonalinfo() }} className="border border-blue-800 border-opacity-10 bg-transparent m-1 w-[70px] bg-blue-500 rounded-md text-white cursor-pointer h-[40px] ">Save </button>
                                                        <button onClick={() => { setFormData(user) }} className="border border-blue-800 border-opacity-10 bg-transparent m-1 w-[70px] bg-red-600  rounded-md text-white  cursor-pointer h-[40px] ">Reset  </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block w-full justify-center items-center rounded-xl m-1 ">
                                            <h5 className="text-center text-2xl  ">Academic</h5>
                                            <div className="xl:flex sm:block md:flex lg:flex overflow-scroll sm:w-100 flex-wrap justify-center items-center"> {/* Added items-center here */}
                                                {user.academics?.map((item: any, index: any) => <Academics key={index} arrayindex={index} course={item} />)}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                                                            
                        

                    </div>

                </div> : ''}
        </>

    )
}


export default ProfilePage