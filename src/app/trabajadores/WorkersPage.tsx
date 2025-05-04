"use client";  // Asegura que el componente se ejecute en el cliente (navegador)
import Link from "next/link";

import React, { useEffect, useState } from "react";

// Tipo para los datos del trabajador
interface Worker {
  _id: string;
  userID: string;
  nombre: string;
  profesion: string;
  wallet: string;
}

const WorkersPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los trabajadores
  const fetchWorkers = async () => {
    try {
      const response = await fetch("/api/workers");
      
      if (!response.ok) throw new Error("Error al obtener los trabajadores");
      const data = await response.json();
      setWorkers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  if (loading) return <div>Cargando colaboradores...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    

    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Colaboradores disponibles
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {workers.map((worker) => (
          <li
            key={worker._id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700"
          >
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              👤 {worker.nombre}
            </p>
            <p className="text-gray-700 dark:text-gray-300">💼 {worker.profesion}</p>
            <p className="text-gray-500 dark:text-gray-400 break-all">🔗 {worker.wallet}</p>
            <Link
              href={`/contratar/${worker.wallet}`}
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
            >
              Contratar
            </Link>
          </li>
        ))}
      </ul>
    </div>
    

  );
};

export default WorkersPage;
