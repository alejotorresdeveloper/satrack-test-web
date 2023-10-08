import { Draggable, Droppable } from "react-beautiful-dnd";
import { ObtenerTareaResponse } from "@/services/GestionTareasSchemas";
import { FC } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Tarea } from "./Tarea";
import { useTableroStore } from "@/store/TableroStore";
import { todo } from "node:test";
import { useModalStore } from "@/store/ModalStore";

type ColumnaProps = {
  id: string;
  tareas: ObtenerTareaResponse[];
  index: number;
};
const nombreDeColumna: { [key in Tableros]: string } = {
  Nueva: "Por hacer",
  EnProgreso: "En progreso",
  Terminada: "Hecho",
};
export const Columna: FC<ColumnaProps> = ({ id, tareas, index }) => {
  const [busqueda] = useTableroStore((state) => [state.busqueda]);
  const [openModal] = useModalStore((state) => [state.openModal]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {nombreDeColumna[id as keyof typeof nombreDeColumna]}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-2 text-sm font-normal">
                    {!busqueda
                      ? tareas.length
                      : tareas.filter((tarea) =>
                          tarea.descripcion
                            .toLowerCase()
                            .includes(busqueda.toLowerCase())
                        ).length}
                  </span>
                </h2>
                <div className="space-y-2">
                  {tareas.map((tarea, index) => {
                    if (
                      busqueda &&
                      !tarea.descripcion
                        .toLowerCase()
                        .includes(busqueda.toLowerCase())
                    ) {
                      return null;
                    }
                    return (
                      <Draggable
                        key={tarea.id!}
                        draggableId={tarea.id!}
                        index={index}
                      >
                        {(provided) => (
                          <Tarea
                            tarea={tarea}
                            index={index}
                            id={id as Tableros}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  {id === "Nueva" && (
                    <div className="flex items-end justify-end p-2">
                      <button
                        type="button"
                        onClick={openModal}
                        className=" text-green-500 hover:text-green-600"
                      >
                        <PlusCircleIcon className="h-10 w-10" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};
