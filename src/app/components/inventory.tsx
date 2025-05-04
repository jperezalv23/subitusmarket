'use client';

import { useState } from "react";
import {
  readContract,
  prepareContractCall,
  sendTransaction,
  estimateGasCost,
} from "thirdweb";
import { contract } from "../contract";
import { useActiveWallet } from "thirdweb/react";

interface Item {
  name: string;
  quantity: number;
}

export default function Inventory() {
  const [itemId, setItemId] = useState<number>(0);
  const [item, setItem] = useState<Item | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const wallet = useActiveWallet();

  const fetchItem = async () => {
    if (itemId < 0) {
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
        method: "function addItem(string,uint256)",
        params: ["Mouse Gamer", 25],
      });

      const account = wallet.getAccount();
      const gasCost = await estimateGasCost({ transaction: tx });

      const transactionResult = await sendTransaction({
        transaction: tx,
        account,
      });

      alert("Item agregado exitosamente!");
    } catch (err) {
      console.error("Error agregando item:", err);
      alert("Hubo un error al agregar el item.");
    }
  };

  const updateStock = async () => {
    if (!wallet) {
      alert("Conecta tu wallet primero.");
      return;
    }

    try {
      const tx = await prepareContractCall({
        contract,
        method: "function updateItem(uint256,string,uint256)",
        params: [itemId, item?.name || "", newQuantity],
      });

      const account = wallet.getAccount();

      await sendTransaction({
        transaction: tx,
        account,
      });

      alert("Cantidad actualizada con éxito!");
      setItem((prev) =>
        prev ? { ...prev, quantity: newQuantity } : prev
      );
    } catch (err) {
      console.error("Error actualizando stock:", err);
      alert("Hubo un error al actualizar el stock.");
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

      {item && (
        <div>
          <h2>Item: {item.name}</h2>
          <p>Cantidad actual: {item.quantity}</p>

          <input
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            placeholder="Nueva cantidad"
          />
          <button onClick={updateStock}>Actualizar stock</button>
        </div>
      )}
    </div>
  );
}
