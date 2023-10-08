"use client";
import { FormEvent, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useModalStore } from "@/store/ModalStore";
import ListadoCategorias from "./ListadoCategorias";
import { format, parse, addDays } from "date-fns";
import { useTableroStore } from "@/store/TableroStore";
import { CrearTareaRequest } from "@/services/GestionTareasSchemas";

function Modal() {
  const [modalAbierto, closeModal] = useModalStore((state) => [
    state.modalAbierto,
    state.closeModal,
  ]);

  const [addTarea, getCategoriaSeleccionada, getTablero] = useTableroStore(
    (state) => [
      state.addTarea,
      state.getCategoriaSeleccionada,
      state.getTablero,
    ]
  );

  const fecha = addDays(new Date(), 1);
  const fechaTexto = format(fecha, "dd/MM/yyyy");

  const [fechaSeleccionada, setFechaSeleccionada] = useState(fechaTexto);
  const [descripcionTarea, setDescripcionTarea] = useState("");
  const [mensajeError, setMensajeError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    // 
    setMensajeError("");
    if (descripcionTarea.trim() === "") {
      setMensajeError("La descripción no puede estar vacía");
      return;
    }
    if (fechaSeleccionada.trim() === "") {
      setMensajeError("La fecha no puede estar vacía");
      return;
    }

    const fechaSeleccionadaDate = parse(fechaSeleccionada, "", new Date());

    if (fechaSeleccionadaDate < fecha) {
      setMensajeError("La fecha no puede ser menor a la actual");
      return;
    }

    const tarea: CrearTareaRequest = {
      descripcion: descripcionTarea,
      fechaLimite: fecha.toISOString().replace("Z", ""),
      categoriaId: getCategoriaSeleccionada(),
    };
    
    addTarea(tarea);
    setDescripcionTarea("");
    setFechaSeleccionada(fechaTexto);
    closeModal();
  }

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={modalAbierto} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        className="relative z-10"
        onClose={closeModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="w-full max-w-md max-h-[calc(100vh-10rem)] transform overflow-y-auto rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all space-y-4">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 pb-2 h-2/4"
                >
                  Agrega tu tarea
                </Dialog.Title>
                {mensajeError && (
                  <div className="text-red-500 text-sm">{mensajeError}</div>
                )}
                <div className="mt-2">
                  <input
                    id="descripcionTarea"
                    type="text"
                    placeholder="Ingrese la descripción de la tarea..."
                    className="w-full border border-gray-300 rounded-md outline-none p-5"
                    value={descripcionTarea}
                    onChange={(e) => setDescripcionTarea(e.target.value)}
                    autoFocus
                  />
                </div>
                <label htmlFor="fechaLimite" className="text-sm text-gray-500">
                  Fecha limite de entrega
                </label>
                <input
                  type="text"
                  placeholder={fechaTexto}
                  className="w-full border border-gray-300 rounded-md outline-none p-5"
                  value={fechaSeleccionada}
                  onChange={(e) => setFechaSeleccionada(e.target.value)}
                  pattern="\d{2}/\d{2}/\d{4}"
                  title="Ingrese una fecha en formato dd/MM/yyyy"
                />
                <ListadoCategorias />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-[#0055D1] px-4 py-2 text-sm font-medium text-white hover:bg-[#5d92e0] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                  >
                    Agregar tarea
                  </button>
                </div>
                {/* ... */}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
