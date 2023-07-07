import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State } from "@/types"
import menus from "@/assets/Manus.json"

const initialState: State = {
  menus: [],
}

export const fetchMenus = createAsyncThunk("menus/fetch", async () => {
  // TODO: do the fetch
  return menus
})

export const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.menus = action.payload
    })
  },
})

export const { 
} = restoSlice.actions
export default restoSlice.reducer
