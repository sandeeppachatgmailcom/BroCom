import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./themeSlice"; 
import activeUser from "./activeUser";
import companyInfo from "./companyInfo";
import adminMenuSlice from "./adminMenu";
import activeChatuser from "./activeChatuser";
import multipleUser from "./multipleUser";
 
import validationSlice from './validationTypes'

const appStore = configureStore({
    reducer:{
        theme:themeSlice,
        activeUser:activeUser,
        company:companyInfo,
        adminSubMenu:adminMenuSlice ,
        activeChatUser:activeChatuser,
        multiUser:multipleUser,
        validationArray :validationSlice
    }
})

export default appStore