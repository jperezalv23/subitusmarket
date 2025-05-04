// db/workers.ts
import { connectDB } from "./mongodb";  // La función de conexión
import mongoose from "mongoose";

// Definir la estructura de un trabajador
interface Worker {
  _id: string;  // Aquí usamos _id en lugar de userID
  nombre: string;
  profesion: string;
  wallet: string;
}

// Esquema de los trabajadores
const workerSchema = new mongoose.Schema(
    {
      nombre: { type: String, required: true },
      profesion: { type: String, required: true },
      wallet: { type: String, required: true, unique: true }, // <- Aquí se añade unique
    },
    { timestamps: true }
  );
  

// Usamos el modelo de "Worker" en la colección 'workers'
const WorkerModel = mongoose.models.Worker || mongoose.model("Worker", workerSchema);

// Función para obtener todos los trabajadores
export const getAllWorkers = async (): Promise<Worker[]> => {
    
  await connectDB(); // Asegúrate de que la DB esté conectada
  const workers = await WorkerModel.find({});
  return workers;
};

// Función para agregar un nuevo trabajador
export const addWorker = async (nombre: string, profesion: string, wallet: string): Promise<Worker> => {
  await connectDB(); // Asegúrate de que la DB esté conectada
  const newWorker = new WorkerModel({ nombre, profesion, wallet });
  console.log("Nuevo trabajador:", newWorker);
  await newWorker.save();
  return newWorker;
};


// Función para obtener un trabajador por su ID (wallet en este caso)
export const getWorkerById = async (workerId: string) => {
    await connectDB(); // Asegúrate de que la DB esté conectada
    const worker = await WorkerModel.findOne({ wallet: workerId }); // Busca por wallet
    return worker;
  };