// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit'
import newsReducer from './sessionSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      detailedNews: newsReducer,
    },
  })
}
