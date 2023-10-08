import { addTarea } from "@/lib/addTarea";
import { deleteTarea } from "@/lib/deleteTarea";
import { getCategorias } from "@/lib/getCategorias";
import { getTareasAgrupadas } from "@/lib/getTareasAgrupadas";
import { moveTarea } from "@/lib/moveTarea";
import { updateTarea } from "@/lib/updateTarea";
import {
  CrearTareaRequest,
  CrearTareaResponse,
  ModificarTareaRequest,
  ObtenerCategoriasResponse,
  ObtenerTareaResponse,
} from "@/services/GestionTareasSchemas";
import { create } from "zustand";

interface TableroState {
  tablero: Tablero;
  tarea: ObtenerTareaResponse | CrearTareaResponse;
  busqueda: string;
  categorias: ObtenerCategoriasResponse[];
  tareaRequest: CrearTareaRequest | ModificarTareaRequest;
  categoriaSeleccionada: string;
  getTablero: () => void;
  setTablero: (tablero: Tablero) => void;
  moveTarea: (tareaId: string, estado: Tableros) => void;
  setBusqueda: (busqueda: string) => void;
  addTarea: (tarea: CrearTareaRequest) => void;
  updateTarea: (id: string, tarea: ModificarTareaRequest) => void;
  setTarea: (tarea: ObtenerTareaResponse | CrearTareaResponse) => void;
  getCategorias: () => void;
  setCategoriaSeleccionada: (categoriaId: string) => void;
  deleteTarea: (tareaId: string, columnaId: Tableros) => void;
  getCategoriaSeleccionada: () => string;
}

export const useTableroStore = create<TableroState>((set) => ({
  tablero: {
    columnas: new Map<Tableros, Columna>(),
  },
  busqueda: "",
  tarea: {
    id: "",
    descripcion: "",
    estadoTarea: "",
    fechaLimite: "",
    fechaFinalizacion: "",
    cumplida: false,
    categoria: {},
    fechaCreacion: "",
  },
  categorias: [],
  tareaRequest: {
    descripcion: "",
    fechaLimite: "",
    categoriaId: "",
  },
  categoriaSeleccionada: "",
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
    set((state) => {
      const nuevasColumnas = new Map(state.tablero.columnas);
      const idColumna = "Nueva" as Tableros;
      const columna = nuevasColumnas.get(idColumna);
      if (columna) {
        nuevasColumnas.get(idColumna).tareas.push(tareaCreada);
      } else {
        nuevasColumnas.set(idColumna, { id: idColumna, tareas: [tareaCreada] });
      }
      return { tablero: { columnas: nuevasColumnas } };
    });
    set({ tarea: tareaCreada });
  },
  updateTarea: async (id, tarea) => {
    const tareaModificada = await updateTarea(id, tarea);
    set({ tarea: tareaModificada });
  },
  setTarea: (tarea) => {
    set({ tarea });
  },
  getCategorias: async () => {
    const categorias = await getCategorias();
    set({ categorias });
    set({ categoriaSeleccionada: categorias[0].id });
  },
  setCategoriaSeleccionada: (categoriaId) => {
    set({ categoriaSeleccionada: categoriaId });
  },
  deleteTarea: async (tareaId, columnaId) => {
    await deleteTarea(tareaId);
    set((state) => {
      const nuevasColumnas = new Map(state.tablero.columnas);
      const columna = nuevasColumnas.get(columnaId);
      if (columna) {
        const tareaEliminada = nuevasColumnas
          .get(columnaId)
          .tareas.find((tarea) => tarea.id === tareaId);
        const index = nuevasColumnas
          .get(columnaId)
          .tareas.indexOf(tareaEliminada);
        if (index !== -1) {
          nuevasColumnas.get(columnaId).tareas.splice(index, 1); // Eliminar la tarea del array
        }
      }
      return { tablero: { columnas: nuevasColumnas } };
    });
  },
  getCategoriaSeleccionada: () => {
    return useTableroStore.getState().categoriaSeleccionada;
  },
}));
