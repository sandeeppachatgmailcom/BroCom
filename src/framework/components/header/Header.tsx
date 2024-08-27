import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUserAddFill } from "react-icons/ri";
import { FaPowerOff } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import {   toggleTheme } from '../../ReduxStore/themeSlice';
  
import { toggleMultiUser } from '../../ReduxStore/multipleUser';
import { login } from '../../ReduxStore/activeUser';
import axiosApi from '../../api/axios';

//import ProfileImageBox from './ProfileImage';

function Header() {

  const dispatch = useDispatch()
 
  const darkTheme = useSelector((state: any) => state.theme.themeDark)
  const activeUser = useSelector((state: any) => state.activeUser.user)
  const company = useSelector((state: any) => state.company.info.companyName)
  const navigate = useNavigate()
  
  const [defaultTheme, setDefaultTheme] = useState(
  
    // Check for initial state based on browser preference (optional):
    localStorage.getItem('theme') || // Check localStorage if available
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark'
      : 'light' // Default to light theme if unavailable
  );
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = () => { setDefaultTheme(mediaQuery.matches ? 'dark' : 'light'); console.log('yes i know') };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);


  const toggleDarkMode = () => {
    dispatch(toggleTheme(defaultTheme))

  }
  useEffect(() => {

    toggleDarkMode()
  }, [defaultTheme])




  async function deleteCookie(cookieName: string) {
    try {
      console.log(cookieName, 'cookieName');
      console.log(Document ,'document.cookie')
      // Clear cookie on client-side (assuming document.cookie is accessible)
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      
      // Send logout request to server (assuming axiosApi is configured)
      const response = await axiosApi.post('/auth/logout', { cookieName });
  
      // Handle server response (optional, based on your API design)
      if (response.status === 200) {
        console.log('Cookie deleted and logout successful:', response.data);
        dispatch(login({})); // Dispatch login action (assuming Redux)
        navigate('/signin'); // Navigate to login page (optional)
      } else {
        console.error('Error during logout:', response.statusText);
        // Handle logout error (e.g., display error message)
      }
    } catch (error) {
      console.error('Error deleting cookie:', error);
      // Handle other errors (e.g., network issues)
    }
  }
  
  const handleAdduser = () => {

    dispatch(toggleMultiUser())

  }

  const handleLogout = () => {
    
    if (activeUser.role == 'student') {
      deleteCookie('manGrowstudent')
      
      console.log('   navigate( /signin )')
       
      
       
    }
    else if (activeUser.role == 'trainer') {
      deleteCookie('manGrowtrainer')
    
      dispatch(login({}))
      
    }
    else if (activeUser.role == 'admin') {
      deleteCookie('manGrowadmin')
      
       
    }
    else
      deleteCookie('manGrow')
      dispatch(login({}))
      
       
  }




  return (
    <div className={`  flex  rounded-sm    w-full h-[100%] items-center justify-between  border-b border-opacity-30 border-gray-300 `}>

      <div className={` flex items-center   justify-start md:h-[100%] h-[100%]     w-6/12 `}>
        <h6 className={` float-start  ms-1 sm:w-auto   text-2xl text-blue-400 font-semibold `}>
          {company}
        </h6>
        {Object.keys(activeUser).length
          ? <button className=' rounded-2xl text-right text-2xl bg-opacity-15   h-20 font-semibold' onClick={() => { if (Object.keys(activeUser).length && activeUser.otpVerified) navigate(`/${activeUser.role}`) }} type="button"  > {activeUser.firstName} </button>
          : ''}
      </div>
      <div className={`md:flex   items-center md:w-6/12 w-full h-[70%]   rounded-xl overflow-hidden block  justify-end `}>
        <div className='  p-1 h-full   flex  items-center justify-end overflow-hidden  w-full md:w-6/12 '>
          <button onClick={handleAdduser} className='  w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1   '>
            {Object.keys(activeUser).length ? <RiUserAddFill className='w-[100%] h-[100%] rounded-full   text-blue-500 bg-gray-600 bg-opacity-15 ' /> : ''}
          </button>
          <button className='  w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1   ' onClick={handleLogout}>
            {Object.keys(activeUser).length ? <FaPowerOff className='w-[100%] h-[100%] rounded-full   text-red-500 bg-gray-600 bg-opacity-15' /> : ''}
          </button>
          <button
            onClick={() => defaultTheme == 'dark' ? setDefaultTheme('light') : setDefaultTheme('dark')}
            className={` w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1  `}
          >
            {darkTheme ? <MdLightMode className='w-[100%] h-[100%] rounded-full   text-white-500 bg-transparent' /> : <MdDarkMode className='w-[100%] h-[100%] rounded-full   text-blue-900  bg-transparent' />}
          </button>
        </div>

      </div>

    </div>

  );
}


export default Header
