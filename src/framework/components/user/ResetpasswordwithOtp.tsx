import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsEyeFill } from "react-icons/bs";
import { BiSolidHide } from "react-icons/bi";
 
import axiosApi from "../../api/axios";
import { toast } from "react-toastify";
import { login } from "../../ReduxStore/activeUser";
import { useNavigate } from "react-router-dom";
import Modal from "../../../interfaces/pages/modalOnLoad";
import { userApi } from "../../../entity/constants/api"; 

const ResetpasswordwithOtp = (props:any) => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<any>({ email: props.email })
  const [view, setView] = useState('password')
  const [password, setPassword] = useState('')
  const [retypeView, setRetypeView] = useState('password')
  const darkTheme = useSelector((state:any) => state.theme)
  const [modal,setModal] = useState(false)
  const ref = useRef<HTMLInputElement | null>(null);

  const handleChange = (e:any) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleresetPassword = async (e:any) => {
    try {
      e.preventDefault();
      console.log(formData, userApi, 'formData')
      console.log(userApi.resetPasswordwithOtp, formData, 'userApi.resetPasswordwithOtp,formData')
      setModal(true)
      const responce = await axiosApi.post(userApi.resetPasswordwithOtp, formData)
      
      console.log(responce, 'responce')
      if (!responce.data.active) {
        toast.error('user is not active please contact admin')
      }
      else {
        toast.success('Password changed')
        setTimeout(() => {
          dispatch(login(responce.data))
          setModal(false)
          if (responce.data.role == 'admin') {
            navigate('/Admin')
          }
          else if (responce.data.role == 'student') {
            navigate('/Student')
          }
          else if (responce.data.role == 'user') {
            navigate('/user')
          }
          else if (responce.data.role == 'trainer') {
            navigate('/Trainer')
          }

        }, 2000)
      }
      console.log(responce, 'response')

    } catch (error:any) {
      if (!error?.responce) {
        console.log('no error message')
      }
    }
  };

  return (
    <div className={`${darkTheme.inputtext} flex flex-col items-center   w-full justify-center  bg-opacity-35 z-50`}>
      {modal?<Modal/>:''}
      <div className="flex  w-full justify-end  " >
        <button type="button" className="font-bold justify-self-center w-[30px] sm:w1/2 md:w1/2  bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300" >
          X
        </button>

      </div>
       <h1 className=" text-blue-400 text-2xl font-semibold"> Change your password </h1>
      <div className=" border sm:w-full lg:w-4/6 flex xl:w-5/6 justify-self-center   rounded-xl p-4 mt-2">
              
        <div className="w-full flex flex-col    mt-3 ">
          <div>
            <label htmlFor="email" className='text-sm'  >Email address</label>
            <input readOnly id="email" name="email" type="email" onLoad={(e) => { handleChange(e) }}   required value={formData.email} autoComplete="email" className={`${darkTheme.inputtext} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Email address" />
          </div>

          <div>
            <label htmlFor="password" className="text-sm">Password</label>
            <div ref={ref} id='passwordDiv' className='flex flex-row  appearance-none rounded-none relative   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  '>
              <input id="password" name="password" type={`${view}`} required value={formData.password} onChange={handleChange} autoComplete="current-password" className={`${darkTheme.inputtext} appearance-none borde relative block   px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-s-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-e-0 rounded-e-none w-5/6`} placeholder="Password" />
              <button className='border-s-0  border-gray-300 rounded-e-md w-1/6 items-end justify-end pl-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10' onClick={(e) => {
                e.preventDefault();
                view == 'password' ? setView('text') : setView('password')
              }} > {view == 'password' ? <BiSolidHide /> : <BsEyeFill />} </button>
            </div>
          </div>


          <div >
            <label htmlFor="password" className="text-sm">Retype Password</label>
            <div ref={ref} id='passwordDiv' className='flex flex-row  appearance-none rounded-none relative   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm '>
              <input id="retypepassword" name="password" type={`${retypeView}`} required value={password} onChange={(e) => { setPassword(e.target.value) }} autoComplete="current-password" className={`${darkTheme.inputtext} appearance-none rounded-none relative block   px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-s-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-e-0 rounded-e-none w-5/6`} placeholder="Password" />
              <button className='border-s-0  border-gray-300 rounded-e-md w-1/6 items-end justify-end pl-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10' onClick={(e) => {
                e.preventDefault();
                retypeView == 'password' ? setRetypeView('text') : setRetypeView('password')
              }} > {retypeView == 'password' ? <BiSolidHide /> : <BsEyeFill />} </button>
            </div>
          </div>

          <div className=" w-full flex justify-end  mt-1 ">
            <button
              type="button" onClick={(e) => { console.log(handleresetPassword(e)) }}
              className="xl:w-2/6 sm:w1/2 md:w1/2  bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
            >
              Login
            </button>
          </div>
        </div>

      </div>

    </div>

  )
}


export default ResetpasswordwithOtp