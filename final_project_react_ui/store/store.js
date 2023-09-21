import { configureStore } from '@reduxjs/toolkit'
import studentReducers from '@/store/Reducers/studentReducers'
import employeeReducer from '@/store/Reducers/employeeReducer'

export const store = configureStore({
  reducer: {
     studentReducers,
     employeeReducer
  },
})