import { createBrowserRouter } from "react-router-dom";
import App from "../../interfaces/pages/App";
import ProfilePage from "../../interfaces/pages/ProfilePage";
import SignupPage from "../../interfaces/pages/SignupPage";
import Login from "../../interfaces/pages/Login"; 
import HomePage from "../../interfaces/pages/HomePage";
import AdminHomePage from "../../interfaces/pages/AdminHomePage";
import TrainerHomePage from "../../interfaces/pages/TrainerHomePage";
import ResetCredential from "../../interfaces/pages/ResetCredential";
import Task_Comp from "../components/Admin/TaskComponent";
import ManageTaskComponent from "../components/Admin/ManageTaskComponent";
import Role from "../../interfaces/pages/Role";

const appRouter  = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children:[
            {
                path:'/user',
                element: <ProfilePage/>
            },
            {
                path:'/role',
                element: <Role/>
            },
            {
                path:'/signUp',
                element:<SignupPage />
            },
            {
                path:'/signin',
                element:<Login />,
                
            },
            {
                path:'/profile',
                element:<ProfilePage/>
            },
            {
                path:'/Student',
                element:<HomePage/>
            },
            {
                path:'/Admin',
                element:<AdminHomePage     />
            },
            {
                path:'/Trainer',
                element:<TrainerHomePage/>
            },
            {
                path:'/submitOtp',
                element:<ResetCredential/>
            }
            ,{
                path:'/submitOtptoresetPassword',
                element:<ResetCredential option='resetPassword' />
            }
            ,
            {
                path:'/',
                element:<ProfilePage />
            } 
             
        ] 
    },
     
]);

export default appRouter;
