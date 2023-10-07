// import { ObtenerTareaResponse } from "./services/GestionTareasSchemas";

type Tableros = "Nueva" | "EnProgreso" | "Terminada";

interface Tablero {
  columnas: Map<Tableros, Columna>;
}

interface Columna {
  id: Tableros;
  tareas: ObtenerTareaResponse[];
}
