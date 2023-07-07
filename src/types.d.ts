/// <reference types="vite/client" />

export interface A {
  name: number
}

export type Menu = {
  name        : string
  img         : string
  price       : string
  tipo        : string
  description : string
}

export type State = {
  menus: Menu[]
}