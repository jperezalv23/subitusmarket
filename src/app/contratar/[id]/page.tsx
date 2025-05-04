"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
    readContract,
    prepareContractCall,
    sendTransaction,
    estimateGasCost,
  } from "thirdweb";
import { contract } from "../../contract"; // Asegúrate de que la ruta sea correcta
import { useActiveWallet } from "thirdweb/react";

// Definir la interfaz para el tipo Worker
interface Worker {
  nombre: string;
  profesion: string;
  wallet: string;
}

export default function ContratarPage() {
    const wallet = useActiveWallet();

  const params = useParams();
  const workerId = params?.id; // El workerId es el wallet
  const [worker, setWorker] = useState<Worker | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0); // Estado para el precio
  const [days, setDays] = useState<number>(1); // Estado para el precio

  const contratar = async () => {
    if (!wallet) {
        alert("Conecta tu wallet primero.");
        return;
      }
      try {
        const valueInWei = (BigInt(price) * 10n ** 18n).toString(); // si price es entero
               
            const tx = await prepareContractCall({
              contract,
              method: "function createJob(address,uint256)", //(address _worker, uint256 _amount, uint256 _deadlineDays)
              params: [workerId, days],
              value: valueInWei, // Enviar el valor en wei
            });
      
            const account = wallet.getAccount();
            const gasCost = await estimateGasCost({ transaction: tx });
            
            const transactionResult = await sendTransaction({
              transaction: tx,
              account,
            });
            
            alert("Trabajo enviado exitosamente!");
          } catch (err) {
            console.error("Error al enviar:", err);
            alert("Hubo un error al enviar el trabajo.");
          }
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(Number(e.target.value));
  };

  // Función para manejar cambios en el input de days
  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDays(Number(e.target.value));
  };


  useEffect(() => {
    if (!workerId) {
      return; // Si no hay workerId, no hace nada
    }

    const fetchWorker = async () => {
      try {
        const response = await fetch(`/api/workers/${workerId}`);
        console.log("Response:", response); // Verifica la respuesta
        if (!response.ok) {
          throw new Error("Error al obtener los datos del trabajador");
        }
        const data: Worker = await response.json();
        console.log("Worker data:", data); // Verifica los datos del trabajador
        setWorker(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchWorker();
  }, [workerId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!worker) {
    return <div>Cargando...</div>;
  }

  return (
<div className="bg-gray-900 text-white min-h-screen p-8">
  <h1 className="text-3xl font-semibold mb-6">Contratar</h1>
  
  
  <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-6">
    <p className="text-lg">Nombre: <span className="font-semibold">{worker.nombre}</span></p>
    <p className="text-lg">Profesión: <span className="font-semibold">{worker.profesion}</span></p>
    <p className="text-lg">Billetera: <span className="font-semibold">{worker.wallet}</span></p>
  </div>

  <div className="bg-gray-800 p-6 rounded-lg shadow-md mt-8">
    <h2 className="text-xl font-semibold mb-4">Detalles del Trabajo</h2>

    <div className="mb-4">
      <label htmlFor="price" className="text-sm text-gray-300">Precio:</label>
      <input
        id="price"
        type="number"
        value={price}
        onChange={handlePriceChange}
        min={0}
        className="w-full mt-2 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="mb-6">
      <label htmlFor="days" className="text-sm text-gray-300">Días:</label>
      <input
        id="days"
        type="number"
        value={days}
        onChange={handleDaysChange}
        min={1}
        className="w-full mt-2 px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    <div className="flex justify-between items-center">
      <div>
        <p className="text-lg">Precio: <span className="font-semibold">${price}</span></p>
        <p className="text-lg">Días: <span className="font-semibold">{days}</span></p>
      </div>

      <button
        onClick={contratar}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
      >
        Contratar
      </button>
    </div>
  </div>
</div>

  );
}
