
import { Outlet,   } from 'react-router-dom';
import Header from '../../framework/components/header/Header'; 
import { Provider, useSelector } from 'react-redux';
import appStore from '../../framework/ReduxStore/appStore';  
import { GoogleOAuthProvider } from '@react-oauth/google';
import { App_page } from '../../entity/pages/app_page';
import ErrorBoundary from '../../framework/components/Error/ErrorBoundary';


const App = (_props:App_page) => {

  
   const theme =useSelector((state:any) => state.theme.theme)
   
   
  return (
     <GoogleOAuthProvider clientId="150250688028-3q3h69aphbc5q7i82f4n6if7or9d3c2d.apps.googleusercontent.com">
      <Provider store={appStore}>
      
       {/* <ErrorBoundary>  */}
          <div   className={`${theme} overflow-y-scroll block h-screen `}>
            <div className={` rounded-xl w-full top-0 left-0  bg-blue-400 bg-opacity-5 xl:h-[10%] h-[24%]     `} >
              <Header/>
            </div>
            <div   className={`rounded-xl w-full top-0 left-0 overflow-scroll bg-blue-400 bg-opacity-5   xl:h-[90%] h-[76%]   `}   >
              <Outlet />
            </div>
          </div>
         {/* </ErrorBoundary>  */}
      </Provider>
     </GoogleOAuthProvider>
  )
}

export default App;
 