import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State } from "@/types"


const initialState: State = {
  cart: [],
  menus: [],
  orders: [
      {
        id:1,
        items:[
        {
          id: 10,
          title: "sopa fuble",
          ingredients: [
            "agua",
            "caldito",
            "fideos"
          ],
          price: "100",
          categories: "sopa",
          description: "",
          image: "",
          reviews: [
            5
          ]
        },
        {
          id: 11,
          title: "helado sopra",
          ingredients: [
            "agua",
            "limon",
            "azucar"
          ],
          price: "300",
          categories: "AAAA",
          description: "",
          image: "",
          reviews: [
            1,
          ]
        }],
      },
    
    
      {
        id:2,
        items:[
        {
          id: 12,
          title: "sopa fuble",
          ingredients: [
            "agua",
            "caldito",
            "fideos"
          ],
          price: "100",
          categories: "sopa",
          description: "",
          image: "",
          reviews: [
            5
          ]
        },
        {
          id: 13,
          title: "helado sopra",
          ingredients: [
            "agua",
            "limon",
            "azucar"
          ],
          price: "300",
          categories: "AAAA",
          description: "",
          image: "",
          reviews: [
            1,
          ]
        }],
      },
    
    
      {
        id:3,
        items:[
        {
          id: 14,
          title: "sopa fuble",
          ingredients: [
            "agua",
            "caldito",
            "fideos"
          ],
          price: "100",
          categories: "sopa",
          description: "",
          image: "",
          reviews: [
            5
          ]
        },
        {
          id: 15,
          title: "helado sopra",
          ingredients: [
            "agua",
            "limon",
            "azucar"
          ],
          price: "300",
          categories: "AAAA",
          description: "",
          image: "",
          reviews: [
            1,
          ]
        }],},
      ],
  currentTable: null,
  // priceFilter: 300,
  // reviewFilter: 1,
  searchFilter: "coca",
  lessThanPriceFilter: Infinity,
  moreThanPriceFilter: 0,
  lessThanReviewFilter: 5,
  moreThanReviewFilter: 0,
  categoryFilter: "",
  userRol: "admin"
}

export const fetchMenus = createAsyncThunk("menus/fetch", async () => {
  // TODO: do the fetch
  const res = await fetch("https://resto-back-production-2867.up.railway.app/dish")
  const data = await res.json()
  return data
})

export const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {
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
      state.cart.push(action.payload);
      
    },

    setCategoryFilter: (state: any, action: any) => {
      state.categoryFilter = action.payload
    }

  }, 
  extraReducers: (builder: any) => {
    builder.addCase(fetchMenus.fulfilled, (state: any, action: any) => {
      state.menus = action.payload
    })
  },
})

export const { 
  agregarPlato,
  setTable,
  setSearchFilter,
  setMoreThanPriceFilter,
  setLessThanPriceFilter,
  setMoreThanReviewFilter,
  setLessThanReviewFilter,
  setCategoryFilter
} = restoSlice.actions
export default restoSlice.reducer
