import { fetchTareaCrearTarea } from "@/services/GestionTareasComponents";
import { CrearTareaRequest } from "@/services/GestionTareasSchemas";

export const addTarea = async (tarea: CrearTareaRequest) => {
  
  const tareaCreada = await fetchTareaCrearTarea({ body: tarea });
  if (tareaCreada.errorCode === 0 && tareaCreada.data) {
    return tareaCreada.data;
  }
};
