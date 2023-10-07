import { addTarea } from "@/lib/addTarea";
import { getTareasAgrupadas } from "@/lib/getTareasAgrupadas";
import { moveTarea } from "@/lib/moveTarea";
import { updateTarea } from "@/lib/updateTarea";
import {
  CrearTareaRequest,
  CrearTareaResponse,
  ModificarTareaRequest,
  ObtenerTareaResponse,
} from "@/services/GestionTareasSchemas";
import { create } from "zustand";

interface TableroState {
  tablero: Tablero;
  getTablero: () => void;
  setTablero: (tablero: Tablero) => void;
  moveTarea: (tareaId: string, estado: Tableros) => void;
  busqueda: string;
  setBusqueda: (busqueda: string) => void;
  addTarea: (tarea: CrearTareaRequest) => void;
  updateTarea: (id: string, tarea: ModificarTareaRequest) => void;
  tarea: ObtenerTareaResponse | CrearTareaResponse;
  setTarea: (tarea: ObtenerTareaResponse | CrearTareaResponse) => void;
}

export const useTableroStore = create<TableroState>((set) => ({
  tablero: {
    columnas: new Map<Tableros, Columna>(),
  },
  busqueda: "",
  setBusqueda: (busqueda) => {
    set({ busqueda });
  },
  getTablero: async () => {
    const tablero = await getTareasAgrupadas();
    set({ tablero });
  },
  setTablero: (tablero) => {
    set({ tablero });
  },
  moveTarea: async (tareaId, estado) => {
    await moveTarea(tareaId, estado);
  },
  addTarea: async (nuevaTarea) => {
    const tareaCreada = await addTarea(nuevaTarea);
    set({ tarea: tareaCreada });
  },
  updateTarea: async (id, tarea) => {
    const tareaModificada = await updateTarea(id, tarea);
    set({ tarea: tareaModificada });
  },
  tarea: {
    id: "",
    titulo: "",
    descripcion: "",
    estado: "Nueva",
    fechaCreacion: "",
    fechaFinalizacion: "",
    fechaInicio: "",
    fechaModificacion: "",
    usuarioCreacion: "",
    usuarioFinalizacion: "",
    usuarioInicio: "",
    usuarioModificacion: "",
  },
  setTarea: (tarea) => {
    set({ tarea });
  },
}));
