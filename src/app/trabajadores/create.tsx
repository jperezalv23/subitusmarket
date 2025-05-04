"use client";  // Asegura que el componente se ejecute en el cliente (navegador)

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useActiveWallet } from "thirdweb/react";

const CreateWorkerForm = () => {
  const [userID, setUserID] = useState("");
  const [nombre, setNombre] = useState("");
  const [profesion, setProfesion] = useState("");
  const activeWallet = useActiveWallet();  
  const wallet = activeWallet?.getAccount()?.address; // Obtiene la dirección de la billetera activa

  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  

  // Función para manejar el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validación simple
    if (!nombre || !profesion || !wallet) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/workers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({  nombre, profesion, wallet }),
      });

      if (!response.ok) {
        throw new Error("Error al crear el trabajador");
      }

      // Redirige al listado de trabajadores después de agregar uno
      router.push("/trabajadores");
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-md shadow-md mt-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Ofrece tus servicios con nosotros
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Profesión
          </label>
          <input
            type="text"
            value={profesion}
            onChange={(e) => setProfesion(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Billetera
          </label>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 break-all">{wallet}</p>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? "Cargando..." : "Registrarse como colaborador"}
        </button>
      </form>
      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
  
};

export default CreateWorkerForm;
