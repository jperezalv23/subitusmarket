"use client";
import { useState, useEffect } from "react";
import { readContract } from "thirdweb";
import { contract } from "../contract";
import { useActiveWallet } from "thirdweb/react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { Transaction } from "ethers";

export default function MyJobsComponent() {
  const wallet = useActiveWallet();
  const walletAddress = wallet?.getAccount()?.address;
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchMyJobs() {
    if (!wallet) {
      setLoading(false);
      return;
    }
    console.log("Buscando el total:");
    try {
      setLoading(true);
      setError(null);
      console.log("Buscando el total:");
      // Obtener el número total de jobs
      const totalJobs = await readContract({
        contract,
        method: "function jobCount() view returns (uint256)",
        params: [],
      });

      console.log("Total jobs:", totalJobs);

      const jobs = [];
      const batchSize = 10; // Procesar en lotes para mejor performance
      const batches = Math.ceil(Number(totalJobs) / batchSize);

      for (let batch = 0; batch < batches; batch++) {
        const start = batch * batchSize;
        const end = Math.min(start + batchSize, Number(totalJobs));

        const batchPromises = [];
        for (let jobId = start; jobId < end; jobId++) {
          batchPromises.push(
            readContract({
              contract,
              method: "function jobs(uint256) view returns (address client, address worker, uint256 amount, uint256 deadline, uint256 createdAt, bool isPaid, bool workConfirmed)",
              params: [jobId],
            }).then((job: any) => ({
                jobId,
                client: job[0],
                worker: job[1],
                amount: BigInt(job[2]),
                deadline: BigInt(job[3]),
                createdAt: BigInt(job[4]),
                isPaid: job[5],
                workConfirmed: job[6],
              }))
              
          );
        }
        

        const batchResults = await Promise.all(batchPromises);
        console.log("Batch results:", batchResults);
        const filtered = batchResults.filter(
          job => job.client === walletAddress || job.worker === walletAddress
        );
        jobs.push(...filtered);
      }

      setMyJobs(jobs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    
    console.log("Fetching jobs for wallet:", wallet);
    fetchMyJobs();
  }, [wallet]);

  const handleConfirmWork = async (jobId) => {
    if (!wallet) {
        alert("Conecta tu wallet primero.");
        return;
      }
    try {
        const account = wallet.getAccount();
      const tx = prepareContractCall({
        contract,
        method: "function confirmWork(uint256 jobId)",
        params: [jobId],
      });
      const transactionResult = await sendTransaction({
        transaction: tx,
        account,
      });

      // Actualizar el estado local
      console.log("Transaction result:", transactionResult);
      alert("Trabajo confirmado exitosamente!");
    } catch (err) {
      console.error("Error confirming work:", err);
      alert("Failed to confirm work");
    }
  };

  const handleConfirmPayment = async (jobId) => {
    if (!wallet) {
        alert("Conecta tu wallet primero.");
        return;
      }
    try {
      const tx = prepareContractCall({
        contract,
        method: "function confirmWorkDone(uint256 jobId)",
        params: [jobId],
      });
      const account = wallet.getAccount();
      const transactionResult = await sendTransaction({
        transaction: tx,
        account,
      });
      console.log("Transaction result:", transactionResult);
      alert("Pago confirmado exitosamente!");
    } catch (err) {
      console.error("Error confirming payment:", err);
      alert("Failed to confirm payment");
    }
  };

  const handleRequestRefund = async (jobId) => {
    try {
      const tx = prepareContractCall({
        contract,
        method: "function requestRefund(uint256 jobId)",
        params: [jobId],
      });
      await sendTransaction(tx);
      // Eliminar el job del estado local
      setMyJobs(prev => prev.filter(job => job.jobId !== jobId));
    } catch (err) {
      console.error("Error requesting refund:", err);
      alert("Failed to request refund");
    }
  };

  const formatDate = (timestamp) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const formatAvax = (amount) => {
    return Number(amount) / 1e18; // Asumiendo que el amount está en wei
  };

  if (!wallet) {
    return <div className="p-4">Por favor conecta tu billetera para ver tus trabajos</div>;
  }

  if (loading) {
    return <div className="p-4">Cargando trabajos...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Mis trabajos</h1>
      
      {myJobs.length === 0 ? (
        <p>No tienes trabajos</p>
      ) : (
        <div className="grid gap-4">
          {myJobs.map((job) => (
            <div key={job.jobId} className="border p-4 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p><strong>ID:</strong> {job.jobId}</p>
                  <p><strong>Cliente:</strong> {job.client}</p>
                  <p><strong>Precio:</strong> {formatAvax(job.amount)} AVAX</p>
                </div>
                <div>
                  <p><strong>Creado:</strong> {formatDate(job.createdAt)}</p>
                  <p><strong>Fecha Limite:</strong> {formatDate(job.deadline)}</p>
                  <p><strong>Estado:</strong> {job.isPaid ? "Pagado" : "Pendiente"}</p>
                  <p><strong>¿Aceptado?:</strong> {job.workConfirmed ? "Si" : "No"}</p>
                </div>
              </div>

              <div className="mt-4 flex gap-2 flex-wrap">
                {/* Botones de acción según el rol y estado */}
                {walletAddress === job.worker && !job.workConfirmed && (
                  <button
                    onClick={() => handleConfirmWork(job.jobId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Aceptar Trabajo
                  </button>
                )}

                {walletAddress === job.client && job.workConfirmed && !job.isPaid && (
                  <button
                    onClick={() => handleConfirmPayment(job.jobId)}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Confirmar Pago
                  </button>
                )}

                {wallet.address === job.client && 
                 !job.workConfirmed && 
                 Date.now() > job.deadline * 1000 && (
                  <button
                    onClick={() => handleRequestRefund(job.jobId)}
                    className="bg-orange-500 text-white px-4 py-2 rounded"
                  >
                    Request Refund
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}