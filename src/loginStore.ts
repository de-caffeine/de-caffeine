import { create } from 'zustand';

type LoginStore = {
  myInfo: User | object;
  saveLoginInfo: (info: User) => void;
  updateLoginInfo: (info: User) => void;
  deleteLoginInfo: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  myInfo: {},
  saveLoginInfo: (info) => set({ myInfo: info }),
  updateLoginInfo: (info) => set({ myInfo: info }),
  deleteLoginInfo: () => set({ myInfo: {} }),
}));
