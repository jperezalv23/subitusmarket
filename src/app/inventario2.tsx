'use client';

import { useEffect, useState } from 'react';
import { readContract } from 'thirdweb';
import { contract } from './contract'; // adjust path if needed
import { useActiveWallet } from 'thirdweb/react';
import { addProduct, getAllProducts } from "../lib/products"; 

interface Item {
  name: string;
  description: string;
}

export default function InventarioPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const wallet = useActiveWallet();

  const fetchInventory = async () => {
    setLoading(true);
    try {
        const products = await getAllProducts(); 
        setItems(products);
    } catch (error) {
      console.error('Error fetching inventory:', error);
      alert('Error al cargar el inventario.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (wallet) {
      fetchInventory();
    }
  }, [wallet]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Inventario Actual</h1>

      {!wallet && <p>Conecta tu wallet para ver el inventario.</p>}

      {wallet && loading && <p>Cargando inventario...</p>}

      {wallet && !loading && items.length === 0 && (
        <p>No hay productos en el inventario.</p>
      )}

      {items.length > 0 && (
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
