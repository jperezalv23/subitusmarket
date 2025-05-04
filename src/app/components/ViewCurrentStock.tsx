'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useActiveWallet } from "thirdweb/react";
import { readContract } from "thirdweb";
import { contract } from "../contract";

interface ViewCurrentStockProps {
  itemId: number;
}

export default function ViewCurrentStock({ itemId }: ViewCurrentStockProps) {
  const wallet = useActiveWallet();
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    if (!wallet) return;

    const fetchStock = async () => {
      console.log("llamando la funcion para buscar el item con ID:", itemId);
      try {
        console.log("Buscando el item con ID:", itemId);
        const result = await readContract({
          contract,
          method: "function getItem(uint256) view returns (string, uint256)",
          params: [itemId],
        });

        console.log("Item encontrado:", result);
        setStock(Number(result[1]));
      } catch (err) {
        console.error("Error leyendo item:", err);
        alert("Hubo un error al buscar el item.");
      }
    };

    fetchStock();
  }, [wallet, itemId]);

  if (stock === null) return <div>Cargando...</div>;

  if (!wallet) return <div>No hay billetersa seleccionada.</div>;
  return (
    <div>
      Stock actual: {stock}
    </div>
  );
}
