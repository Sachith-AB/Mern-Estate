import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error:null,
    loading:null
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state) =>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        },
        updateUserStart:(state)=>{
            state.user = true;

        },
        updateUserSucess:(state,action)=>{ 
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            
        },
        updateUserFailure:(state,action)=>{
            state.error = action.payload;
            state.loading = false;
            
        },
        signOutSucess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        }

    }
});

export const {signInStart,signInSuccess,signInFailure,updateUserFailure,updateUserStart,updateUserSucess,signOutSucess} = userSlice.actions;

export default userSlice.reducer;