/// <reference types="vite/client" />

export interface A {
  name: number
}

// export type Menu = {
//   name        : string
//   img         : string
//   price       : string
//   tipo        : string
//   description : string
// }
export interface Order  {
  id:number
  items: Menu[]
}



export type State = {
  cart: Menu[]
  menus: IMenu[]
  orders: Order[]
  currentTable: number | null
  priceFilter: number
  reviewFilter: number
  searchFilter: string
  lessThanPriceFilter: number
  moreThanPriceFilter: number
  lessThanReviewFilter: number
  moreThanReviewFilter: number
}

export interface FormMenuData { 
  name: string
  precio: string
  descripcion: string
  tipo: string
} 

export type InputSelect = React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>

export interface Props {
  children: string | JSX.Element | JSX.Element[]
}

export interface ButtonProps extends Props {
  action: Function
}

export interface IMenu {
  title: string
  ingredients: string[]
  price: string
  categories: string
  reviews: number[]
  image: string
  description: string
}

export interface IProcessedMenu {
  [key: string]: Omit<IMenu, "categories">
}

