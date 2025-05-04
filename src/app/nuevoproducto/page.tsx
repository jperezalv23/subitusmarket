'use client';

import { useState, useTransition } from 'react';
import { useActiveWallet } from 'thirdweb/react';
import { contract } from "../contract";
import { addProductAction } from '../../app/actions/productActions'; // Adjust the import path as needed
import { readContract, prepareContractCall, sendTransaction, estimateGasCost } from "thirdweb";

export default function AddProductForm() {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const wallet = useActiveWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault();
    if (!wallet) {
        alert("Conecta tu wallet primero.");
        return;
      }

      try {
            const tx = await prepareContractCall({
              contract,
              method: "addItem",
              params: [name, quantity],
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
            

            startTransition(() => {
                addProductAction(name, description);
              });
              console.log("BD confirmada:");
              alert("Item agregado exitosamente!");
          } catch (err) {
            console.error("Error agregando item:", err);
            alert("Hubo un error al agregar el item.");
          }
    
    

  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md">
      <div>
        <label className="block mb-1 font-semibold">Nombre del producto</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Stock inicial</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full border px-3 py-2 rounded"
          min={0}
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>

      <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded">
        {isPending ? 'Agregando...' : 'Agregar producto'}
      </button>
    </form>
  );
}
