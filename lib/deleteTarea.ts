import { fetchTareaEliminarTarea } from "@/services/GestionTareasComponents";

export const deleteTarea = async (tareaId) => {
  const tarea = await fetchTareaEliminarTarea({ pathParams: { id: tareaId } });
  if (tarea.errorCode === 0 && tarea.data) return tarea.data;
  else return false;
};
