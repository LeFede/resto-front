import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { State, IMenu } from "@/types"

  // TODO: BORRAR && api
const menu: IMenu[]= [
  {
    id: 1,
    title: "Milanesa Napolitana",
    ingredients: [
      "carne de res",
      "jamon y queso",
      "salsa de tomate"
    ],
    price: "2500",
    categories: "Almuerzos",
    description: "Una milanesa muy rica. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.paulinacocina.net/wp-content/uploads/2015/03/P1150541-e1439164269502.jpg",
    reviews: [
      5,1
    ],
  },
  {
    id: 2,
    title: "Ensalada Cesar",
    ingredients: [
      "Lechuga",
      "Pollo",
      "queso crema",
      "semillas de sesamo"
    ],
    price: "2000",
    categories: "Almuerzos",
    description: "No apto para celiacos. . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.cocinacaserayfacil.net/wp-content/uploads/2018/06/Ensalada-cesar.jpg",
    reviews: [
      5,1
    ],
  },
  {
    id: 3,
    title: "Cafe con Leche",
    ingredients: [
      // "no se",
      // "adwqijiowqjw qdwqdqw"
    ],
    price: "500",
    categories: "Desayunos",
    description: "Cafe boliviano negro. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://www.eltiempo.com/files/article_main_1200/uploads/2023/01/31/63d92a122f24b.jpeg",
    reviews: [
      5,1
    ],
  },
  {
    id: 4,
    title: "Medialuna",
    ingredients: [
      // "no se",
      // "adwqijiowqjw qdwqdqw"
    ],
    price: "150",
    categories: "Desayunos",
    description: "Precio unitario. Hechas en el dia. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 5,
    title: "Almendrado",
    ingredients: [
      "Helado de vainilla",
      "Mouse de chocolate",
      "almendras"
    ],
    price: "1500",
    categories: "postres",
    description: "Almendras italianas",
    image: "https://truffle-assets.tastemadecontent.net/2ce3b18e-c8f4fff8-almendrado-l-thumb---auto-cropped.jpg",
    reviews: [
      5
    ]
  },
  {
    id: 6,
    title: "Flan aleman",
    ingredients: [
      "Flan casero",
      "pizca de limon",
      "crema chantilli",
    ],
    price: "1650",
    categories: "Postres",
    description: "",
    image: "https://sinreservas.com.ar/download/multimedia.grande.9ca8d446eee9515e.62353231653962306636346436663466313932353335636436663039313630315f6772616e64652e77656270.webp",
    reviews: [
      1,
    ]
  },
  {
    id: 5,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro1",
    description: "otro1",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 6,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro2",
    description: "otro2",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 7,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro3",
    description: "otro3",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 8,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro4",
    description: "otro4",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 9,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro5",
    description: "otro5",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
  {
    id: 10,
    title: "Medialuna",
    ingredients: [
    ],
    price: "150",
    categories: "otro6",
    description: "otro6",
    image: "https://sinreservas.com.ar/download/multimedia.normal.8e7535fe7665009a.4c6120706170612073757320392072656365746173206261cc817369636173205f6e6f726d616c2e77656270.webp",
    reviews: [
      5,1
    ],
  },
]

const initialState: State = {
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
        }],
      },
    
  ],
  currentTable: null,
  // priceFilter: 300,
  // reviewFilter: 1,
  searchFilter: "",
  lessThanPriceFilter: 10000,
  moreThanPriceFilter: 0,
  lessThanReviewFilter: 5,
  moreThanReviewFilter: 0,
  categoryFilter: "",
  userRol: "admin"
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
  setTable,
  setSearchFilter,
  setMoreThanPriceFilter,
  setLessThanPriceFilter,
  setMoreThanReviewFilter,
  setLessThanReviewFilter,
  setCategoryFilter
} = restoSlice.actions
export default restoSlice.reducer
