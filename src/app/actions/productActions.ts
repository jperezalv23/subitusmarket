// src/app/actions/productActions.ts
'use server';

import { addProduct, getAllProducts } from "../../lib/products"; 

export async function addProductAction(name: string, description: string) {
  return await addProduct(name, description);
}
