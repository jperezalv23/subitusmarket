"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import abi from "../abi.json"; // Asegúrate de que el ABI esté correctamente importado

const contractAddress = "0x0D2F07B71B6222902ef9a8157ADeCa6EbBEE04b6";

interface Evento {
  itemId: string;
  action: string;
  quantity: string;
  user: string;
  timestamp: string;
}

export default function Historial() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Conectar al proveedor (puedes usar Infura, Alchemy o un nodo local)
        const provider = new ethers.providers.JsonRpcProvider(
          "https://rpc.ankr.com/avalanche_fuji" // Cambia esto si usas otro proveedor
        );

        // Conectar al contrato
        const contract = new ethers.Contract(contractAddress, abi, provider);

        // Obtener eventos
        const events = await contract.queryFilter(
          contract.filters.ItemAdded() // Esto es dinámico para otros eventos también
        );

        // Si hay más tipos de eventos, puedes agregar más filtros aquí:
        const itemAddedEvents = await contract.queryFilter("ItemAdded");
        const itemUpdatedEvents = await contract.queryFilter("ItemUpdated");
        const itemRemovedEvents = await contract.queryFilter("ItemRemoved");

        // Formatear los eventos
        const formattedEvents = [
          ...itemAddedEvents.map((event) => ({
            itemId: event.args?.itemId.toString(),
            action: "ItemAdded",
            quantity: event.args?.quantity.toString(),
            user: event.args?.user || "N/A",
            timestamp: new Date(event.blockNumber * 1000).toLocaleString(),
          })),
          ...itemUpdatedEvents.map((event) => ({
            itemId: event.args?.itemId.toString(),
            action: "ItemUpdated",
            quantity: event.args?.quantity.toString(),
            user: event.args?.user || "N/A",
            timestamp: new Date(event.blockNumber * 1000).toLocaleString(),
          })),
          ...itemRemovedEvents.map((event) => ({
            itemId: event.args?.itemId.toString(),
            action: "ItemRemoved",
            quantity: "0",
            user: event.args?.user || "N/A",
            timestamp: new Date(event.blockNumber * 1000).toLocaleString(),
          })),
        ];

        setEventos(formattedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de Transacciones</h1>
      {isLoading ? (
        <p>Cargando eventos...</p>
      ) : (
        <table className="w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Item ID</th>
              <th className="px-4 py-2">Acción</th>
              <th className="px-4 py-2">Cantidad</th>
              <th className="px-4 py-2">Fecha</th>
              <th className="px-4 py-2">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{evento.itemId}</td>
                <td className="px-4 py-2">{evento.action}</td>
                <td className="px-4 py-2">{evento.quantity}</td>
                <td className="px-4 py-2">{evento.timestamp}</td>
                <td className="px-4 py-2">{evento.user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
