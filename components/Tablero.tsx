"use client";
import { useEffect } from "react";
import { useTableroStore } from "@/store/TableroStore";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import * as Columna from "./Columna";
import { start } from "repl";

export const Tablero = () => {
  const [tablero, getTablero, setTablero, updateTarea] = useTableroStore((state) => [
    state.tablero,
    state.getTablero,
    state.setTablero,
    state.moveTarea,
  ]);

  useEffect(() => {
    getTablero();
  }, [getTablero]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    const columnas = Array.from(tablero.columnas);
    const indiceInicial = columnas[Number(source.droppableId)];
    const indiceFinal = columnas[Number(destination.droppableId)];

    const columnaInicial = {
      id: indiceInicial[0],
      tareas: indiceInicial[1].tareas,
    };

    const columnaFinal = {
      id: indiceFinal[0],
      tareas: indiceFinal[1].tareas,
    };

    if (!columnaInicial || !columnaFinal) return;

    if (source.index === destination.index && columnaInicial === columnaFinal)
      return;

    const nuevasTareas = columnaInicial.tareas;
    const [tareaMovida] = nuevasTareas.splice(source.index, 1);

    if (columnaInicial.id === columnaFinal.id) {
      nuevasTareas.splice(destination.index, 0, tareaMovida);

      const nuevaColumna = {
        id: columnaInicial.id,
        tareas: nuevasTareas,
      };

      const nuevasColumnas = new Map(tablero.columnas);
      nuevasColumnas.set(columnaInicial.id, nuevaColumna);

      setTablero({ ...tablero, columnas: nuevasColumnas });
    } else {
      const tareasTerminadas = Array.from(columnaFinal.tareas);
      tareasTerminadas.splice(destination.index, 0, tareaMovida);

      const nuevasColumnas = new Map(tablero.columnas);
      const nuevaColumna = {
        id: columnaInicial.id,
        tareas: nuevasTareas,
      };

      nuevasColumnas.set(columnaInicial.id, nuevaColumna);
      nuevasColumnas.set(columnaFinal.id, {
        id: columnaFinal.id,
        tareas: tareasTerminadas,
      });
      
      //Actualizar en base de datos
      updateTarea(tareaMovida.id, columnaFinal.id);

      setTablero({ ...tablero, columnas: nuevasColumnas });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tablero" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(tablero.columnas.entries()).map(
                ([id, columna]: [string, Columna], index: number) => (
                <Columna.Columna
                  key={id}
                  id={id}
                  tareas={columna.tareas}
                  index={index}
                />
              )
            )}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
