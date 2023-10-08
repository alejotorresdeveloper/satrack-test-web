import { useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useTableroStore } from "@/store/TableroStore";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function ListadoCategorias() {
  const [
    categorias,
    categoriaSeleccionada,
    getCategorias,
    setCategoriaSeleccionada,
  ] = useTableroStore((state) => [
    state.categorias,
    state.categoriaSeleccionada,
    state.getCategorias,
    state.setCategoriaSeleccionada,
  ]);

  useEffect(() => {
    getCategorias();
  }, [getCategorias]);

  return (
    <div className="w-full py-5">
      <div className="mx-auto w-full max-w-md">
        <label htmlFor="categoria" className="text-sm text-gray-500">
          Categoría
        </label>
        <RadioGroup
          id="categoria"
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e)}
        >
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {categorias.map((categoria) => (
              <RadioGroup.Option
                key={categoria.id!}
                value={categoria.id!}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-offset-2 ring-offset-blue-300 ring-white ring-opacity-60"
                      : ""
                  }
                  ${
                    checked
                      ? "bg-blue-50 bg-opacity-75 text-blue-600"
                      : "bg-white"
                  }
                    relative rounded-lg shadow-md px-5 py-4 cursor-pointer flex focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-blue-900" : "text-gray-900"
                            }`}
                          >
                            {categoria.descripcion!}
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className="flex-shrink-0 text-blue-900">
                          <CheckCircleIcon className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}

export default ListadoCategorias;
