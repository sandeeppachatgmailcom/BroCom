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

//import ProfileImageBox from './ProfileImage';

function Header() {

  const dispatch = useDispatch()
  const [_logout, setLogout] = useState(false)
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




  function deleteCookie(cookieName: any) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    console.log(`Cookie ${cookieName} has been deleted`);
  }
  const handleAdduser = () => {

    dispatch(toggleMultiUser())

  }

  const handleLogout = () => {

    if (activeUser.role == 'student') {
      deleteCookie('manGrowstudent')
      setLogout(true)
      dispatch(login({}))
       
    }
    else if (activeUser.role == 'trainer') {
      deleteCookie('manGrowtrainer')
      setLogout(true)
      dispatch(login({}))
    }
    else if (activeUser.role == 'admin') {
      deleteCookie('manGrowadmin')
      setLogout(true)
       
    }
    else
      deleteCookie('manGrow')
      dispatch(login({}))
       
  }




  return (
    <div className={`  md:flex flex-col sm:flex-row rounded-xl  w-full h-[100%] items-center justify-between shadow-lg `}>

      <div className={` flex items-start justify-start md:h-[100%] h-[30%] flex-col   w-6/12 p-4`}>
        <h6 className={` float-start  sm:w-auto text-2xl text-blue-500 font-semibold `}>
          {company}
        </h6>
        {Object.keys(activeUser).length
          ? <button className=' rounded-2xl text-right text-2xl bg-opacity-15 h-20 font-semibold' onClick={() => { if (Object.keys(activeUser).length && activeUser.otpVerified) navigate(`/${activeUser.role}`) }} type="button"  > {activeUser.firstName} </button>
          : ''}
      </div>
      <div className={`md:flex  items-center md:w-6/12 w-full h-[70%]   rounded-xl overflow-scroll block  justify-end `}>
        <div className=' h-10   p-4  md:h-full rounded-xl flex  items-center justify-end   overflow-hidden  w-full md:w-6/12 '>
          <button onClick={handleAdduser} className='  w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1 shadow-xl '>
            {Object.keys(activeUser).length ? <RiUserAddFill className='w-[100%] h-[100%] rounded-full   text-blue-500 bg-gray-600 bg-opacity-15 ' /> : ''}
          </button>
          <button className='  w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1 shadow-xl ' onClick={handleLogout}>
            {Object.keys(activeUser).length ? <FaPowerOff className='w-[100%] h-[100%] rounded-full   text-red-500 bg-gray-600 bg-opacity-15' /> : ''}
          </button>
          <button
            onClick={() => defaultTheme == 'dark' ? setDefaultTheme('light') : setDefaultTheme('dark')}
            className={` w-1/12 justify-center h-[100%] rounded-full flex  items-center    m-1 shadow-xl`}
          >
            {darkTheme ? <MdLightMode className='w-[100%] h-[100%] rounded-full   text-white-500 bg-gray-600 bg-opacity-15' /> : <MdDarkMode className='w-[100%] h-[100%] rounded-full   text-gray-500 bg-gray-800 bg-opacity-15' />}
          </button>
        </div>

      </div>

    </div>

  );
}


export default Header
