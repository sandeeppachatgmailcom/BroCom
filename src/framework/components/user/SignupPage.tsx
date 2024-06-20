import  { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link  } from 'react-router-dom';
import GAuth from '../google/Authentication'; 
import { BsEyeFill } from "react-icons/bs";
import { BiSolidHide } from "react-icons/bi";
import axiosApi from '../../api/axios';
import { userApi } from '../../../entity/constants/api'; 
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../../../interfaces/pages/modalOnLoad';
import { FcGoogle } from "react-icons/fc";
import { SignupPage_pages } from '../../../entity/pages/signupPage_Pages';
import { toast } from 'react-toastify';



const SignupPage = (_props:SignupPage_pages) => {
  const [view,setView] = useState('password')
  const [retypeView,setRetypeView] = useState('password')
  const [margin ] = useState('flex flex-row  appearance-none rounded-none relative   border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 border-indigo-500 focus:z-10 sm:text-sm  ')
  const darkTheme = useSelector((state:any)=>state.theme)
  const [password,setPassword] = useState(null)
  const ref = useRef<HTMLDivElement | null>(null);
  const imagePath = '../src/images/sugc.png' 
  const [role,setRole] = useState('')
  const [modal,setModal] = useState(false)
  useEffect(()=>{console.log(darkTheme.theme,'test')},[darkTheme])
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    type:'',
    googleAuth:false
  });

    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };

  

const handleDivMargin=()=>{
  ref.current!.className=margin
}

 
const validatePassword = (password:string) => {
  // Validate password length
  if (password.length < 8) {
    return {status:false,message:'Password must be at least 8 characters long'}
  }
  // Validate if password contains at least one uppercase letter
  if (!/[A-Z]/.test(password)) {
    return {status:false,message:'Password must contain at least one uppercase letter'}
  }
  // Validate if password contains at least one lowercase letter
  if (!/[a-z]/.test(password)) {
    return {status:false,message:'Password must contain at least one lowercase letter'}
  }
  // Validate if password contains at least one number
  if (!/\d/.test(password)) {
    return {status:false,message:'Password must contain at least one number'}
  }
  // Validate if password contains at least one special character
  if (!/[^a-zA-Z0-9]/.test(password)) {
    return {status:false,message:'Password must contain at least one special character'}
  }
  // If no errors, return an empty string
  return {status:true,message:''}
};

  const handleSubmit = async(e:any) => {
    
    e.preventDefault();
    if(formData.email.trim().length)
    {
      setModal(true)
      await axiosApi.post(userApi.signUp,formData)
        .then(response => {
        console.log('Response:', response?.data);
        if(response?.data.success){
        console.log("inside")
        
        toast.success(`user ${response.data.firstname} created ,Validate OTP while Sign in within 30 minute `,   )
        
        }
            else{
            toast.error(`user  alredy exist `)
        }
        })
        .catch(error => {
        console.error('Error:', error);
        });
    }
    else {
      toast.error('name is not valid ')
    }
    
  }
  

  return (
    <div className= {` ${darkTheme.theme}  xl:flex lg:flex md:block sm:block  justify-center xl:w-full items-center m-3 h-[100%] `}>
        {modal?<Modal/>:''}
       <div className="xl:flex justify-center sm:w-full sm:block  md:w-full  h-[300px] "> 
            <div style={{backgroundImage:`url('${imagePath}')`,backgroundPosition:'center' , backgroundSize:'contain',backgroundRepeat:'no-repeat' }} className={`  ${darkTheme.theme  } xl:w-full  m-2 h-[100%]  `}>

            </div>

       </div>
      <div className={` ${darkTheme.theme } max-w-md w-full space-y-8 border p-5 rounded-xl`}>
        <div>
          <h2 className={` ${darkTheme.inputtext} mt-6 text-center text-3xl  `}>Sign up</h2>
        </div>
       
        
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className={` ${darkTheme.inputtext} text-sm `}>Name</label>
              <input  id="name" required name="name" type="text"  value={formData.name} onChange={handleChange} autoComplete="name" className={`${darkTheme.inputtext} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email" className= 'text-sm'  >Email address</label>
              <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} autoComplete="email" className={`${darkTheme.inputtext} appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`} placeholder="Email address" />
            </div>
            
            <div className='flex items-center pt-3'>
              <label className="inline-flex items-center" htmlFor="Student"> <input type="radio" required name='type' id='Student' value='Student' className="form-radio h-4 w-4 text-indigo-600 text-sm"   checked={formData.type === "Student"}  onChange={(e)=>{handleChange(e);setRole('Student')} } />  <span className="text-sm ml-2"> Student   </span></label>  
              <label className="inline-flex items-center" htmlFor="Trainer"> <input type="radio" required name='type' id='Trainer' value='Trainer' className="form-radio h-4 w-4 text-indigo-600"   checked={formData.type === "Trainer"}  onChange={(e)=>{handleChange(e);setRole('Trainer')} } />  <span className="ml-2 text-sm"> Trainer </span></label>
            </div>
            <div>
              <label htmlFor="password" className="text-sm">Password</label>
              <div ref={ref} id='passwordDiv' className='flex flex-row  appearance-none rounded-none relative   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm  '>
                <input onClick={handleDivMargin} id="password" name="password" type={`${view}`} required value={formData.password} onChange={handleChange} autoComplete="current-password" className={`${darkTheme.inputtext} appearance-none borde relative block   px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-e-0 rounded-e-none w-5/6`} placeholder="Password" />
                <button className='border-s-0  border-gray-300 rounded-e-md w-1/6 items-end justify-end pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10' onClick={(e)=>{e.preventDefault();
                  view=='password'?setView('text'):setView('password')}} > {view=='password'?<BsEyeFill />:<BiSolidHide />} </button>
                </div>
            </div>
            <div >
              <label htmlFor="password" className="text-sm">Retype Password</label>
              <div  id='passwordDiv'  className='flex flex-row  appearance-none rounded-none relative   border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm '>
                <input onClick={handleDivMargin} id="retypepassword" name="password" type={`${retypeView}`} required value={String(password)} onChange={(e:any)=>{setPassword(e.target.value)}} autoComplete="current-password" className={`${darkTheme.inputtext} appearance-none rounded-none relative block   px-3 py-2  border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm border-e-0 rounded-e-none w-5/6`} placeholder="Password" />
                <button className='border-s-0  border-gray-300 rounded-e-md w-1/6 items-end justify-end pl-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10' onClick={(e)=>{e.preventDefault();
                  retypeView=='password'?setRetypeView('text'):setRetypeView('password')}} > {retypeView=='password'?<BsEyeFill />:<BiSolidHide />} </button>
                </div>
            </div>
          </div>
          <div>

            {formData.password == password && 
             validatePassword(password).status  
             && formData.email.trim().length>0 
             && formData.name.trim().length >0 
             && formData.email.includes('@')  ?<button onClick={(e)=>{handleSubmit(e)}} type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </ button>:<button  disabled className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Sign up
            </ button> } 
          
            <br />
             <h1 className='w-full text-center '> or </h1>
             <div className='flex align-center justify-center   h-[50px] ' aria-disabled={role.length ? false : true}>
                {role.length ? <GAuth role={role} /> : <h1 className='text-red-500 font-semibold  w-full flex justify-center align-middle  h-100 '>  <FcGoogle /> Choose a role to sign in </h1>}
             </div>
            <div className='container flex justify-end'>
            <Link to="/signin"> Sign in </Link>

            </div>
          </div>
        
      </div>
    </div>
  );
};

export default SignupPage;
