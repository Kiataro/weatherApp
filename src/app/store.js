import { configureStore } from '@reduxjs/toolkit';
import cityReducer from '../features/citySlice';

export const store = configureStore({
  reducer: {
    cities: cityReducer
  },
});
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
