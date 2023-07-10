import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State, IMenu } from "@/types"

  // TODO: BORRAR && api
const menu: IMenu[]= [
  {
    title: "Milanesa Napolitana",
    ingredients: [
      "carne de res",
      "jamon y queso",
      "salsa de tomate"
    ],
    price: "2500",
    categories: "Almuerzos",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "Ensalada Cesar",
    ingredients: [
      "Lechuga",
      "Pollo",
      "queso crema",
      "semillas de sesamo"
    ],
    price: "2000",
    categories: "Almuerzos",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "Cafe con Leche",
    ingredients: [
      // "no se",
      // "adwqijiowqjw qdwqdqw"
    ],
    price: "500",
    categories: "Desayunos",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "Medialuna",
    ingredients: [
      // "no se",
      // "adwqijiowqjw qdwqdqw"
    ],
    price: "150",
    categories: "Desayunos",
    description: "",
    image: "",
    reviews: [
      5,1
    ],
  },
  {
    title: "Fuble",
    ingredients: [
      "Helado de vainilla",
      "Mouse de chocolate",
      "almendras"
    ],
    price: "1500",
    categories: "postres",
    description: "",
    image: "",
    reviews: [
      5
    ]
  },
  {
    title: "Flan aleman",
    ingredients: [
      "Flan casero",
      "pizca de limon",
      "crema chantilli",
    ],
    price: "1650",
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
  }, 
  extraReducers: (builder: any) => {
    builder.addCase(fetchMenus.fulfilled, (state: any, action: any) => {
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
