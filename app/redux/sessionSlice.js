import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  news: {},
}

const NewsSlice = createSlice({
  name: 'More Info Of News',
  initialState,
  reducers: {
    updateNews: (state, action) => {
      state.news = action.payload
    }
  },
})

export const { updateNews } = NewsSlice.actions
export default NewsSlice.reducer
