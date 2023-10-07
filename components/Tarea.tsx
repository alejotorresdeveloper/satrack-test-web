import { FC } from "react";
import { ObtenerTareaResponse } from "@/services/GestionTareasSchemas";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

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
          <span className="text-xs mt-2 font-semibold text-[#0055D1]">{tarea.categoria.nombre}</span>
        </p>
        <button className=" text-red-500 hover:text-red-600">
          <XCircleIcon className="ml-5 h-8 w-8" />
        </button>
      </div>
    </div>
  );
};
