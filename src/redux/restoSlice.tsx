import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State, IMenu } from "@/types"

  // TODO: BORRAR && api
const menu: IMenu[]= [
  {
    title: "Milangosa",
    ingredients: [
      "no se",
      "adwqijiowqjw qdwqdqw"
    ],
    price: "30000000",
    categories: "super comidas",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "Mila",
    ingredients: [
      "no se",
      "adwqijiowqjw qdwqdqw"
    ],
    price: "300",
    categories: "super comidas",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "tomate",
    ingredients: [
      "no se",
      "adwqijiowqjw qdwqdqw"
    ],
    price: "3000",
    categories: "super comidas",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "coca cola",
    ingredients: [
      "no se",
      "adwqijiowqjw qdwqdqw"
    ],
    price: "30000",
    categories: "super comidas",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "sopa fuble",
    ingredients: [
      "agua",
      "caldito",
      "fideos"
    ],
    price: "100",
    categories: "Sopas",
    description: "",
    image: "",
    reviews: [
      5
    ]
  },
  {
    title: "helado sopra",
    ingredients: [
      "agua",
      "limon",
      "azucar"
    ],
    price: "300",
    categories: "Postres",
    description: "",
    image: "",
    reviews: [
      1,
    ]
  },
]

const initialState: State = {
  menus: [],
  orders: [
    
      {
        id:1,
        items:[
        {
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
    
  ],
  currentTable: null,
  priceFilter: 300,
  reviewFilter: 1,
  searchFilter: "",
  lessThanPriceFilter: Infinity,
  moreThanPriceFilter: 0,
  lessThanReviewFilter: 5,
  moreThanReviewFilter: 0,
}

export const fetchMenus = createAsyncThunk("menus/fetch", async () => {
  // TODO: do the fetch
  return menu
})

export const restoSlice = createSlice({
  name: "resto",
  initialState,
  reducers: {
    setTable: (state, action) => {
      const { payload: table } = action
      state.currentTable = table
    },
    setSearchFilter: (state, action) => {
      state.searchFilter = action.payload
    },
    setLessThanPriceFilter: (state, action) => {
      if (action.payload < 0) return
      state.lessThanPriceFilter = action.payload
    },
    setMoreThanPriceFilter: (state, action) => {
      if (action.payload < 0) return
      state.moreThanPriceFilter = action.payload
    },
    setLessThanReviewFilter: (state, action) => {
      if (action.payload < 0) return
      if (action.payload > 5) return
      state.lessThanReviewFilter = action.payload
    },
    setMoreThanReviewFilter: (state, action) => {
      if (action.payload < 0) return
      if (action.payload > 5) return
      state.moreThanReviewFilter = action.payload
    },
  }, 
  extraReducers: (builder) => {
    builder.addCase(fetchMenus.fulfilled, (state: any, action) => {
      state.menus = action.payload
    })
  },
})

export const { 
  setTable,
  setSearchFilter,
  setMoreThanPriceFilter,
  setLessThanPriceFilter,
  setMoreThanReviewFilter,
  setLessThanReviewFilter,
} = restoSlice.actions
export default restoSlice.reducer
