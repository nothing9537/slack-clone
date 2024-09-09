import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ModalType = "workspaceCreationModal";

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>()(devtools((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
})));
