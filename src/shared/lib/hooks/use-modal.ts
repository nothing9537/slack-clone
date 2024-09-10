import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { ModalData } from "../../types";

type ModalType = "workspaceCreationModal" | "workspacePreferencesModal";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType, modalData?: ModalData) => void;
  onClose: () => void;
  modalData: ModalData | null;
}

export const useModal = create<ModalStore>()(devtools((set) => ({
  isOpen: false,
  type: null,
  modalData: null,
  onOpen: (type, modalData?: ModalData) => set({ type, isOpen: true, modalData: modalData || null }),
  onClose: () => set({ type: null, isOpen: false, modalData: null }),
})));

export const useModalGeneric = <T extends ModalData = ModalData>() => {
  const { modalData, ...args } = useModal();

  return { ...args, modalData: modalData as T };
};
