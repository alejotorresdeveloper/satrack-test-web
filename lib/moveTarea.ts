import {
  fetchTareaFinalizarTareaTarea,
  fetchTareaIniciarTarea,
  fetchTareaReiniciarTarea,
} from "@/services/GestionTareasComponents";

export const moveTarea = async (tareaId: string, estado: Tableros) => {
  let resultado;

  switch (estado) {
    case "Nueva":
      resultado = await fetchTareaReiniciarTarea({
        pathParams: { id: tareaId },
      });
      break;
    case "EnProgreso":
      resultado = await fetchTareaIniciarTarea({
        pathParams: { id: tareaId },
      });
      break;
    case "Terminada":
      resultado = await fetchTareaFinalizarTareaTarea({
        pathParams: { id: tareaId },
      });
      break;
    default:
      return false;
  }
  return resultado.errorCode === 0 && resultado.data;
};
