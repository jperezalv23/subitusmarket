import { NextResponse } from "next/server";
import { getAllWorkers, addWorker, getWorkerById } from "../../../db/workers";

// Obtener todos los trabajadores
export async function GET() {
  try {
    const workers = await getAllWorkers();
    return NextResponse.json(workers);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener los trabajadores" }, { status: 500 });
  }
}

// Agregar un nuevo trabajador
export async function POST(req: Request) {
    const { nombre, profesion, wallet } = await req.json();
  
    if (!nombre || !profesion || !wallet) {
      return NextResponse.json({ error: "Faltan datos en la solicitud" }, { status: 400 });
    }
  
    try {
      const newWorker = await addWorker(nombre, profesion, wallet);
      return NextResponse.json(newWorker, { status: 201 });
    } catch (error: any) {
      console.error("Error al guardar trabajador:", error);
      return NextResponse.json({ error: error.message || "Error al agregar el trabajador" }, { status: 500 });
    }
  }

  // Obtener trabajador por ID
export async function GET_BY_ID(req: Request) {
    const { searchParams } = new URL(req.url);
    const workerId = searchParams.get('id'); // Asegúrate de que el id está siendo pasado como parámetro de búsqueda
  
    if (!workerId) {
      return NextResponse.json({ error: "Falta el id del trabajador" }, { status: 400 });
    }
  
    try {
      const worker = await getWorkerById(workerId); // Buscar trabajador por id
      if (!worker) {
        return NextResponse.json({ error: "Trabajador no encontrado" }, { status: 404 });
      }
      return NextResponse.json(worker);
    } catch (error) {
      return NextResponse.json({ error: "Error al obtener el trabajador" }, { status: 500 });
    }
  }
  