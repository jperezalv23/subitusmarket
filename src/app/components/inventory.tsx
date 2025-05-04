'use client';

import { useState } from "react";
import { readContract, prepareContractCall, sendTransaction, estimateGasCost } from "thirdweb";
import { contract } from "../contract";
import { useActiveWallet } from "thirdweb/react";
import { useRouter } from 'next/navigation'; // ✅ App Router

interface Item {
  name: string;
  quantity: number;
}

export default function Inventory() {
  const [itemId, setItemId] = useState<number>(0);
  const [item, setItem] = useState<Item | null>(null);
  const wallet = useActiveWallet();
  const router = useRouter(); // ✅ App Router

  const fetchItem = async () => {
    if (itemId <= 0) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }

    try {
      const result = await readContract({
        contract,
        method: "function getItem(uint256) view returns (string, uint256)",
        params: [itemId],
      });

      setItem({ name: result[0], quantity: result[1] });
    } catch (err) {
      console.error("Error leyendo item:", err);
      alert("Hubo un error al buscar el item.");
    }
  };

  const addItem = async () => {
    if (!wallet) {
      alert("Conecta tu wallet primero.");
      return;
    }

    try {
      const tx = await prepareContractCall({
        contract,
        method: "addItem",
        params: ["Mouse Gamer", 25],
      });

      const account = wallet.getAccount();
      if (!account) {
        alert("No se pudo obtener la cuenta.");
        return;
      }

      const gasCost = await estimateGasCost({ transaction: tx });
      console.log("Costo estimado:", gasCost.ether);

      const transactionResult = await sendTransaction({
        transaction: tx,
        account,
      });

      console.log("Transacción confirmada:", transactionResult);
      alert("Item agregado exitosamente!");
    } catch (err) {
      console.error("Error agregando item:", err);
      alert("Hubo un error al agregar el item.");
    }
  };

  return (
    <div>
      <div className="flex gap-4">
        <button onClick={addItem} disabled={!wallet} className="button">
          Agregar item
        </button>

        
      </div>

      <input
        type="number"
        value={itemId}
        onChange={(e) => setItemId(Number(e.target.value))}
        placeholder="Ingresa el ID del item"
      />

      <button onClick={fetchItem} disabled={!wallet}>
        Buscar
      </button>

    </div>
  );
}
