'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useActiveWallet } from "thirdweb/react";
import {
  prepareContractCall,
  sendTransaction,

} from "thirdweb";
import { contract } from "../contract";

interface ViewCurrentStockProps {
  itemId: number;
}

export default function UpdateStockComponent({ itemId }: ViewCurrentStockProps) {
  const wallet = useActiveWallet();
  const [newQuantity, setNewQuantity] = useState<number>(0);


    const updateStock = async () => {
    if (!wallet) {
      alert("Conecta tu wallet primero.");
      return;
    }

    try {
      const tx = await prepareContractCall({
        contract,
        method: "function updateItem(uint256,string,uint256)",
        params: [itemId, "", newQuantity],
      });

      const account = wallet.getAccount();

      await sendTransaction({
        transaction: tx,
        account,
      });

      alert("Cantidad actualizada con éxito!");
    } catch (err) {
      console.error("Error actualizando stock:", err);
      alert("Hubo un error al actualizar el stock.");
    }
  };


  if (!wallet) return <div>No hay billetersa seleccionada.</div>;
  return (
    <div>
        <input
                    type="number"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    placeholder="Nueva cantidad"
                  />
      <button onClick={updateStock}>Actualizar stock</button>
    </div>
  );
}
