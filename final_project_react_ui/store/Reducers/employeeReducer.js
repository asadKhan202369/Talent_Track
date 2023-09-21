import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    employee:null,
    findjob:null,
    errors:[],
    isAuthenticated:false,
    findjob:'',
    allreview:'',

}

export const employeeReducer = createSlice({
  name: 'employee',
  initialState,
  
  reducers:{
     gethome:(state,action)=>{
       state.student = action.payload
     },

      addemployee:(state,action)=>{
         state.employee = action.payload;
         state.isAuthenticated = true;
      },
      removeemployee:(state,action)=>{
         state.employee = null;
         state.isAuthenticated = false;
      },
      iserror:(state,action)=>{
         state.errors.push(action.payload);  
      },
      removeerror:(state,action)=>{
         state.errors = [];  
      },
      foundjob:(state,action)=>{
         state.findjob = action.payload;
      },
      addallreviews:(state,action)=>{
         state.allreview = action.payload;
      },
  }
  
})

// Action creators are generated for each case reducer function
export const { 
   
    addemployee,
    removeerror,
    removeemployee,
    iserror ,
    gethome,
    foundjob,
    addallreviews,

 } = employeeReducer.actions

export default employeeReducer.reducer;