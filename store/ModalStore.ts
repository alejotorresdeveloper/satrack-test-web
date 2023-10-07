import { create } from "zustand";

interface ModalState {
  modalAbierto: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalAbierto: false,
  openModal: () => {
    set({ modalAbierto: true });
  },
  closeModal: () => {
    set({ modalAbierto: false });
  },
}));
