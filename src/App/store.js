
//This creates a Redux store, and also automatically configure the Redux DevTools extension so that you can inspect the store while developing.import { configureStore } from '@reduxjs/toolkit'
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import RoomReducer from '../features/counter/roomslice'
import TemplateReducer from '../features/counter/Template'

export default configureStore({
  reducer: {
    User: counterReducer,
    campaign:RoomReducer,
    Template:TemplateReducer,
  },
  
})


