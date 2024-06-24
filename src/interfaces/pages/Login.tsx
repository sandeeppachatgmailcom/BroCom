import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {   useNavigate } from "react-router-dom";
import GAuthsignin from "../../framework/components/google/googleAuthSignin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosApi from "../../framework/api/axios";
import Modal from "./modalOnLoad";
import { login } from "../../framework/ReduxStore/activeUser";
import { userApi } from "../../entity/constants/api";  
import LoginGraph from "../../framework/components/utilComponents/LoginCommon"; 


function Login( ) {
   
  const [formData, setFormData] = useState<any>({
    name: '',
    email: '',
    type: '',
    googleAuth: false
  })
  const [modal, setModal] = useState(false)
  const classDarkTheme = useSelector((state: any) => state.theme.theme)
  const darkMode = useSelector((state: any) => state.theme)
  const dispatch = useDispatch()
  const activeUser = useSelector((state: any) => state.activeUser.user)
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement | null>(null);
  //useHandleRouter(activeUser.role)
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

    

 
  

 
  const handleLogin = async (_e: any) => {
    try {
     // e.preventDefault();
      const responce = await axiosApi.post(userApi.login, formData,{
        withCredentials: true
      })
       
      console.log(responce, 'responce.data.password,responce,')
      if (!responce.data.active) {
        toast.error(responce.data.message)
      }
      else {
        if (!responce.data.otpVerified) responce.data.resetPaaword = false;
        dispatch(login(responce.data))
 

      }
      console.log(responce, 'response')

    } catch (error: any) {
      if (!error?.responce) {
        console.log('no error message')
      }
    }
  };



  useEffect(() => {
    if (Object.keys(activeUser).length) {

      if (!activeUser.otpVerified && Object.keys(activeUser).length > 2) {
        navigate('/submitOtp')
      }
      else if (activeUser.otpVerified && Object.keys(activeUser).length > 2) {
        if (activeUser.role == 'admin') {
          navigate('/Admin')
        }
        else if (activeUser.role == 'student') {
          navigate('/Student')
        }
        else if (activeUser.role == 'user') {
          // navigate('/user')
        }
        else if (activeUser.role == 'trainer') {
          navigate('/Trainer')
        }

      }
      else console.log('nothing happend')
    }
  }, [activeUser])


  const handleForgotPassword = async () => {
    try {

      if (emailRef?.current?.value) {
        setModal(true)
        const otp = await axiosApi.post(userApi.forgotPassword, { email: formData.email, name: formData.email })
        setModal(false)
        if (otp?.data?.success) {
          formData.resetPaaword = true;
          dispatch(login(formData))
          navigate('/submitOtp')
        }
        else toast.error(otp?.data?.message)
      }
      else {

        toast.error('submit a valid email')
      }

    } catch (error) {

    }


  }

  return (

    <div className={`  ${classDarkTheme + ' ' + darkMode.inputtext} m-2 mx-auto overflow-scroll h-[100%]  lg:flex w-full p-3 `}>


      <ToastContainer />
      {modal ? <Modal /> : ''}

      <div className="xl:flex     justify-center hidden xl:w-4/6 opacity-45 items-center w-full overflow-hidden  sm:block h-[70%]    m-2 ">
        <LoginGraph />

      </div>
      <div className={`flex flex-col  xl:flex justify-center  items-center w-full    p-3 h-[70%] xl:w-2/6 m-1 rounded-lg  `}>
        <div className=" block w-8/12   overflow-hidden border border-gray-600 justify-self-center border-opacity-15 shadow-xl  rounded-xl p-3  ">
          <h2 className={`${classDarkTheme} text-2xl font-semibold mb-4`}>Login</h2>
          <h6 className={`${classDarkTheme} text-small  mb-4`}> </h6>


          <div className="mb-4">
            <label htmlFor="email" className={`  ${classDarkTheme} block`}>Email</label>
            <input
              type="email"
              id="email" ref={emailRef}
              className={`${darkMode.inputtext}   w-full px-3 py-2 border border-gray-300 border-opacity-35 rounded-md focus:outline-none focus:border-indigo-500`}
              placeholder="Enter your email"
              value={formData.email} name="email"
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className={`  ${classDarkTheme} block `}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`${darkMode.inputtext} w-full px-3 py-2 border border-gray-300 rounded-md border-opacity-35 focus:outline-none focus:border-indigo-500`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              required
            />
            <div className="w-full flex justify-end "><small className="cursor-pointer text-right w-full text-blue-400" onClick={() => { handleForgotPassword() }}>forgot password</small> </div>
          </div>
          <br />

          <button
            type="button" onClick={(e) => { console.log(handleLogin(e)) }}
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
          <div className=" flex container justify-end">
            <small onClick={() => navigate('/signUp')} > Register </small>

          </div>
          <h1 className='w-full text-center '> or </h1>
          <div className=" ">
            <GAuthsignin />
          </div>

        </div>
      </div>
    </div>

  );
}

export default Login
