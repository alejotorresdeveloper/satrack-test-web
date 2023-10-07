import { fetchTareaObtenerTareas } from "@/services/GestionTareasComponents";
import { ObtenerTareaResponse } from "@/services/GestionTareasSchemas";

export const getTareasAgrupadas = async () => {
  const respuesta = await fetchTareaObtenerTareas({});

  if (respuesta.errorCode == 0 && respuesta.data) {
    const tareas = respuesta.data;

    const tareasAgrupadas = tareas.reduce(
      (acumulador: Map<Tableros, Columna>, tarea: ObtenerTareaResponse) => {
        const key = tarea.estadoTarea || "Nueva";
        if (!acumulador.has(key as Tableros)) {
          acumulador.set(key as Tableros, {
            id: key as Tableros,
            tareas: [],
          });
        }
        acumulador.get(key as Tableros)?.tareas.push(tarea);
        return acumulador;
      },
      new Map<Tableros, Columna>()
    );
    
    const tiposDeTableros: Tableros[] = ["Nueva", "EnProgreso", "Terminada"];

    for (const tipoDeTablero of tiposDeTableros) {
      if (!tareasAgrupadas.has(tipoDeTablero)) {
        tareasAgrupadas.set(tipoDeTablero, {
          id: tipoDeTablero,
          tareas: [],
        });
      }
    }

    const tareasAgrupadasOrdenadas = new Map(
      Array.from(tareasAgrupadas).sort(
        (a, b) => tiposDeTableros.indexOf(a[0]) - tiposDeTableros.indexOf(b[0])
      )
    );

    const tablero: Tablero = {
      columnas: tareasAgrupadasOrdenadas,
    };

    return tablero;
  } else {
    return {
      columnas: new Map<Tableros, Columna>(),
    };
  }
};
