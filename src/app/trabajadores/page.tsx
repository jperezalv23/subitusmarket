import React from "react";
import WorkersPage from "./WorkersPage";  // Asegúrate de importar el componente de visualización de trabajadores
import CreateWorkerForm from "./create";  // Asegúrate de importar el componente de creación de trabajadores

const Workers = () => {
  return (
    <div>
    
      <CreateWorkerForm />
      <WorkersPage />
    </div>
  );
};

export default Workers;
