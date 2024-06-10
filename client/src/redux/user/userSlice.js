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
        },
        deleteUserStart:(state)=>{
            state.loading = true;
            state.error = null;
        },
        deleteUserFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteUserSuccess:(state)=>{
            state.loading = null;
            state.error=null;
            state.currentUser=null;
        }

    }
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    updateUserFailure,
    updateUserStart,
    updateUserSucess,
    signOutSucess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    } = userSlice.actions;

export default userSlice.reducer;