import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'Theme',
    initialState: {
        themeDark: false,
        lightTheme: ' bg-white-100 text-gray-500',
        darkTheme: ' bg-gray-800 text-slate-50  ',
        theme: '',
        buttontheme:'bg-gray-800 text-white',
        border: 'border-stone-950 ',
        inputtext:''
    },
    reducers: {
        toggleTheme: (state, action: {payload:string}) => {
            state.themeDark = action.payload === 'dark'?state.themeDark = true:state.themeDark =false ;
            state.theme = state.themeDark ? state.darkTheme : state.lightTheme;
            state.border = state.themeDark ? 'border-stone-950' : 'border-stone-600';
            state.inputtext = state.themeDark ? 'bg-gray-800 border-gray-600 text-slate-50' : 'bg-white-800 border-gray-600 text-white-800';
          }
          ,
        switchDarkTheme:(state,actions)=>{
            state.themeDark = !actions.payload;  
            state.theme = state.themeDark ? state.darkTheme : state.lightTheme;  
            state.border=state.themeDark ? ' border-stone-950 ': ' border-stone-600 ';
            state.inputtext = state.themeDark ?'bg-gray-800 border-gray-600 text-slate-50':'border-gray-600 bg-white-800 text-white-800 '
        }
    }
});

export const { toggleTheme,switchDarkTheme } = themeSlice.actions;
export default themeSlice.reducer;
