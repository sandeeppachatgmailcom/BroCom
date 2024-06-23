

import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import axiosApi from "../../api/axios"; 
import { userApi } from "../../../entity/constants/api";
import { useDispatch } from 'react-redux';
import { login } from "../../ReduxStore/activeUser";
import { GAuthsignin_Component } from "../../../entity/components/google/GAuthsignin";
const GAuthsignin = (_props:GAuthsignin_Component) => {
    const dispatch = useDispatch() 
    const handleSubmit = async(e:any,formData:any) => {
        e.preventDefault();
        console.log(formData,userApi.login);
        const result = await axiosApi.post(userApi.login,formData)
        .then(response => {
          console.log('Response:', response.data);
          dispatch(login(response.data)) 
        })
        .catch(error => {
          console.error('Error:', error);
        });
       
        console.log(result,'responce')
      }
  
      
    return (
        <div className='flex items-center justify-center text-center   rounded-xl p-5'>
            <GoogleLogin onSuccess={credentialResponse => {
                    console.log(credentialResponse);
                    const decoded :any = jwtDecode(credentialResponse.credential as string);
                    console.log(decoded)
                    
                   if(decoded?.email_verified){
                    const formData = {
                        name:decoded.name,
                        email:decoded.email,
                        googleAuth:true
                    }
                    handleSubmit(Event,formData);  
                   }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            /> 


        </div>
    );
};

export default GAuthsignin;
