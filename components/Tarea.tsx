import { FC } from "react";
import { ObtenerTareaResponse } from "@/services/GestionTareasSchemas";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";
import { format } from "date-fns";
import { useTableroStore } from "@/store/TableroStore";

type TareaProps = {
  tarea: ObtenerTareaResponse;
  index: number;
  id: Tableros;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export const Tarea: FC<TareaProps> = ({
  tarea,
  index,
  id,
  innerRef,
  dragHandleProps,
  draggableProps,
}) => {
  const [deleteTarea] = useTableroStore((state) => [state.deleteTarea]);

  function handleOnClick(): void {
    deleteTarea(tarea.id, id);
  }
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-5">
        <p className="flex flex-col">
          {tarea.descripcion}
          <span className="text-xs mt-2 font-semibold text-gray-500">
            {format(new Date(tarea.fechaLimite), "dd/MM/yyyy")}
          </span>
          <span className="text-xs mt-2 font-semibold text-[#0055D1]">
            {tarea.categoria.nombre}
          </span>
        </p>
        <button
          onClick={handleOnClick}
          className=" text-red-500 hover:text-red-600"
        >
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
