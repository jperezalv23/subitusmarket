"use client";

import { useState } from "react";
import { readContract, prepareContractCall, sendTransaction, waitForReceipt, estimateGasCost } from "thirdweb";
import { contract } from "../contract"; // Asegúrate de que la ruta sea correcta
import { useActiveWallet } from "thirdweb/react";


interface Item {
  name: string;
  quantity: number;
}



export default function Inventory() {
  const [itemId, setItemId] = useState<number>(0);
  const [item, setItem] = useState<Item | null>(null);
  const wallet = useActiveWallet();

  // Fetch item details from the contract
  const fetchItem = async () => {
    if (itemId <= 0) {
      alert("Por favor, ingresa un ID válido.");
      return;
    }
    console.log("Fetching item with ID:", itemId);
    try { 
      const result = await readContract({
        contract,
        method: "function getItem(uint256) view returns (string, uint256)",
        params: [parseInt(itemId)], // asegúrate de que sea un número
      });
      
      console.log("Item fetched:", result);
      // Assuming the contract returns [name, quantity]
      setItem({
        name: result[0],
        quantity: result[1],
      });
    } catch (err) {
      console.error("Error leyendo item:", err);
      alert("Hubo un error al buscar el item. Revisa la consola para más detalles.");
    }
  };

  const addItem = async () => {
    if (!wallet) {
      alert("Conecta tu wallet primero.");
      return;
    }
  
    try {
      console.log("billetera", wallet.getAccount());
  
      const tx = await prepareContractCall({
        contract,
        method: "addItem",
        params: ["Mouse Gamer", 25],
      });
  
      console.log("Contrato preparado", tx);
  
      console.log("Enviando transacción...");
      
      try {
        const account = wallet.getAccount();
        if (!account) {
          alert("No se pudo obtener la cuenta.");
          return;
        }

        const gasCost = await estimateGasCost({ transaction: tx });
        console.log("cost in ether", gasCost.ether);
        
        const transactionResult = await sendTransaction({
          transaction: tx,
          account,
        });
        
         

        console.log("Resultado de la transacción:", transactionResult);

        console.log("Transacción confirmada:", transactionResult);
      } catch (err) {
        console.error("Error al enviar la transacción:", err);
      }
  
      
      alert("Item agregado exitosamente!");
    } catch (err) {
      console.error("Error agregando item:", err);
      alert("Hubo un error al agregar el item. Revisa la consola para más detalles.");
    }
  };
  
  return (
    <div>
      <button onClick={addItem} disabled={!wallet} className="button">
        Agregar item
      </button>
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
          <p>Nombre: {item.name}</p>
          <p>Cantidad: {item.quantity.toString()}</p>
        </div>
      )}
    </div>
  );
}
