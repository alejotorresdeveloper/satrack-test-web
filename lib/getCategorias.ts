import { fetchTareaObtenerCategorias } from "@/services/GestionTareasComponents";

export const getCategorias = async () => {
  const categorias = await fetchTareaObtenerCategorias({});
  if (categorias.errorCode === 0 && categorias.data) return categorias.data;
  else return [];
};
