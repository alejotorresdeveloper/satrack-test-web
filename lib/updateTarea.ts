import { fetchTareaModificarTarea } from "@/services/GestionTareasComponents";
import { ModificarTareaRequest } from "@/services/GestionTareasSchemas";

export const updateTarea = async (id: string, tarea: ModificarTareaRequest) => {
  const tareaModificada = await fetchTareaModificarTarea({
    pathParams: { id },
    body: tarea,
  });
  if (tareaModificada.errorCode === 0 && tareaModificada.data) {
    return tarea;
  }
};
