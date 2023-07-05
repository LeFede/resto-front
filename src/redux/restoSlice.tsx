import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const initialState = {
  menus:[],
}

// export const fetchVideogames = createAsyncThunk("videogames/fetch", async (thunkAPI) => {
//   const res = await fetch(`${endpoint}/videogames`)
//   const data = await res.json()
//   return data
// })


export const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {
    getMenus: (state,{payload})=>{
      const data = payload;
      state.menus = data;
  }
  }, 
  extraReducers: (builder) => {
    // builder.addCase(fetchVideogames.fulfilled, (state, action) => {
    //   state.videogames = action.payload
    // })
  },
})

export const { 
  getMenus
} = restoSlice.actions
export default restoSlice.reducer
