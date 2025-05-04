// /app/api/workers/[id]/route.ts

import { NextResponse } from "next/server";
import { getWorkerById } from "../../../../db/workers"; // Asegúrate de que la ruta sea correcta

// Obtener trabajador por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const workerId = params.id; // El ID es parte de la ruta, accesible a través de params
  
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
