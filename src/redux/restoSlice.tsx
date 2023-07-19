import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit"
import { State, Dishdata } from "@/types"


const initialState: State = {
  cart: [
  ],
  menus: [],
  orders: [],
  order: [],
  currentTable: null,
  // priceFilter: 300,
  // reviewFilter: 1,
  searchFilter: "",
  lessThanPriceFilter: Infinity,
  moreThanPriceFilter: 0,
  lessThanReviewFilter: 5,
  moreThanReviewFilter: 0,
  categoryFilter: "",
  userRol: "client"
}
export const fetchOrders = createAsyncThunk("orders/fetch", async () => {
  const res = await fetch("http://resto-back-production-2867.up.railway.app/order")
  const data = await res.json()
  return data
});

export const fetchMenus = createAsyncThunk("menus/fetch", async () => {
  // TODO: do the fetch
  const res = await fetch("https://resto-back-production-2867.up.railway.app/dish")
  const data = await res.json()
  return data
})

export const postMenu: any = createAsyncThunk("menus/post", async (payload: Dishdata) => {
  const method = 'POST'
  const headers = {
    "Content-Type": 'application/json; charset=UTF-8'
  }
  const body = JSON.stringify(payload)


  try {
    const response = await fetch("https://resto-back-production-2867.up.railway.app/dish", {
      method,
      headers,
      body
    })
    const data = await response.json()
    if (!response.ok) {      
      const error = {
        message: data.message,
        status: response.status
      }
      throw error
    }
    alert(`${data.title} creado con exito!`)
    return data
  } catch (error: any) {
    console.log(error);
    
    if (error.status === 401) alert(`${error.status}: ${error.message}`)
  }
})




export const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {

    setUserRol: (state) => {
      state.userRol = "admin";
    },
    

    setUserRolLogout: (state) => {
      state.userRol = "client"
    },

    setTable: (state: any, action: any) => {
      const { payload: table } = action
      state.currentTable = table
    },
    setSearchFilter: (state: any, action: any) => {
      state.searchFilter = action.payload
    },
    setLessThanPriceFilter: (state: any, action: any) => {
      if (action.payload < 0) return
      state.lessThanPriceFilter = action.payload
    },
    setMoreThanPriceFilter: (state: any, action: any) => {
      if (action.payload < 0) return
      state.moreThanPriceFilter = action.payload
    },
    setLessThanReviewFilter: (state: any, action: any) => {
      if (action.payload < 0) return
      if (action.payload > 5) return
      state.lessThanReviewFilter = action.payload
    },
    setMoreThanReviewFilter: (state: any, action: any) => {
      if (action.payload < 0) return
      if (action.payload > 5) return
      state.moreThanReviewFilter = action.payload
    },

    agregarPlato: (state, action) => {
      const cart = current(state.cart)
      const id = action.payload.dish
      const indexOfEl = cart.findIndex(e => e.dish === id)
      if (indexOfEl > -1) {
        state.cart[indexOfEl] = {
          ...cart[indexOfEl],
          quantity: cart[indexOfEl].quantity + 1
        }
        console.log(cart)
        return
      } 
      state.cart.push(action.payload);
    },

    removeDish: (state, action) => {
      const cart = current(state.cart)
      const id = action.payload.dish
      const indexOfEl = cart.findIndex(e => e.dish === id)
      if (indexOfEl > -1) {
        if (cart[indexOfEl].quantity > 1)
          state.cart[indexOfEl] = {
            ...cart[indexOfEl],
            quantity: cart[indexOfEl].quantity - 1
          }
        else 
          state.cart = cart.filter(dish => dish.dish !== action.payload.dish)

        console.log(cart)
        return
      } 

    },


    setCategoryFilter: (state: any, action: any) => {
      state.categoryFilter = action.payload
    },
  }, 
  extraReducers: (builder: any) => {
    builder.addCase(fetchMenus.fulfilled, (state: any, action: any) => {
      state.menus = action.payload
    }),
    builder.addCase(fetchOrders.fulfilled, (state: any, action: any) => {
      state.orders = action.payload
    }),
    builder.addCase(postMenu.fulfilled, (state: any, action: any) => {
      state.menus.push(action.payload);
    })
  },
})

export const { 
  agregarPlato,
  removeDish,
  setTable,
  setSearchFilter,
  setMoreThanPriceFilter,
  setLessThanPriceFilter,
  setMoreThanReviewFilter,
  setLessThanReviewFilter,
  setCategoryFilter,
  setUserRol,
  setUserRolLogout,
} = restoSlice.actions
export default restoSlice.reducer
