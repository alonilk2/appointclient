import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import dashboardReducer from './features/dashboardSlice'
import businessReducer from './features/businessSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    dashboard: dashboardReducer,
    business: businessReducer
  },
})

export default store;