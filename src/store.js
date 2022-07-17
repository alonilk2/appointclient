import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import dashboardReducer from './features/dashboardSlice'
import businessReducer from './features/businessSlice'
import customerReducer from './features/customerSlice'
import appointReducer from './features/appointSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    business: businessReducer,
    customer: customerReducer,
    appoint: appointReducer
  },
})

export default store;