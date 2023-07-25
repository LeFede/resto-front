import { SetStateAction } from "react";
import { DishDataError, Dishdata } from "../types";

export const validate = ({ title, price, description, categories, image }: Dishdata): DishDataError => {
  const errors: SetStateAction<Partial<DishDataError> | Record<string, never>> = {};
  
  if (!title) {
    errors.title = 'Nombre del plato es requerido';
  }

  if (title.length > 75) {
    errors.title = 'Máximo de 75 caracteres';
  }
  
  if (!description) {
    errors.description = 'La descripción del plato es requerida';
  }
  
  if (description.length > 300) {
    errors.title = 'Máximo de 300 caracteres';
  }

  if (!image) {
    errors.image = 'La foto del plato es requerida';
  }

  if (!price) {
    errors.price = 'Precio del plato es requerido';
  }

  if (price <= 0) {
    errors.price = 'Precio debe ser mayor a 0'
  }

  if (!categories) {
    errors.categories = 'Debe seleccionar una categoría'
  }

  if (!['main', 'appetizer', 'dessert', 'drink'].includes(categories)) {
    errors.categories = 'La selección debe ser Plato principal, Entrada, Postre o Bebida'
  }
  
  return errors as DishDataError;
}