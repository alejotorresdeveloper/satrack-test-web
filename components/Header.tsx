"use client";
import React from "react";
import {
  MagnifyingGlassIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Avatar from "react-avatar";
import { useTableroStore } from "@/store/TableroStore";

export const Header = () => {
  const [busqueda, setBusqueda] = useTableroStore((state) => [state.busqueda, state.setBusqueda]);
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-md">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-white to-slate-600 rounded-md filter blur-3xl opacity-50 -z-50"></div>
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Search box */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="flex-1 outline-none"
            ></input>
            <button hidden type="submit">
              Search
            </button>
          </form>
          <Avatar name="Alejandro Torres" size="50" round color="#0055D1" />
        </div>
      </div>
    </header>
  );
};
