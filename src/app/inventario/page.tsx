import { useEffect, useState } from 'react';
import { readContract } from 'thirdweb';
import { contract } from '../contract'; // adjust path if needed
import { useActiveWallet } from 'thirdweb/react';
import { addProduct, getAllProducts } from "../../db/products"; 
import NavigateButton from '../components/NavigateButton'; // Adjust the import path as needed
import ViewCurrentStock from '../components/ViewCurrentStock'; // Adjust the import path as needed
interface Item {
  name: string;
  description: string;
}

export default async function InventarioPage() {
  const items = await getAllProducts();
  

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Inventario Actual</h1>
      {items.length === 0 ? (
        <p>No hay productos en el inventario.</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Producto</th>
              <th className="px-4 py-2 text-left">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">
                  <ViewCurrentStock itemId={idx} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

        <NavigateButton />
    </div>
  );
}