import { connectDB } from "./mongodb";  // La función de conexión
import mongoose from "mongoose";

// Definir la estructura del producto
interface Product {
  name: string;
  description: string;
}

// Definimos el esquema de un solo documento con un array de productos
const productSchema = new mongoose.Schema(
  {
    products: [
      {
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Usamos un solo documento en la colección 'inventory'
const Inventory = mongoose.models.Inventory || mongoose.model("Inventory", productSchema);

// Función para obtener todos los productos
export const getAllProducts = async (): Promise<Product[]> => {
  await connectDB(); // Asegúrate de que la DB esté conectada
  const inventory = await Inventory.findOne({});
  return inventory ? inventory.products : [];
};

// Función para agregar un nuevo producto
export const addProduct = async (name: string, description: string): Promise<Product[]> => {
  await connectDB(); // Asegúrate de que la DB esté conectada
  let inventory = await Inventory.findOne({});

  if (!inventory) {
    // Si no existe, crea el primer documento con el array vacío
    inventory = new Inventory({ products: [] });
    await inventory.save();
  }

  // Agregar el nuevo producto al array de productos
  inventory.products.push({ name, description });
  await inventory.save();
  return inventory.products;
};
