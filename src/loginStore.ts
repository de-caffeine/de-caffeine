import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginStore = {
  myInfo: User | null;
  saveLoginInfo: (info: User) => void;
  updateLoginInfo: (info: User) => void;
  deleteLoginInfo: () => void;
};

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      myInfo: null,
      saveLoginInfo: (info) => set({ myInfo: info }),
      updateLoginInfo: (info) => set({ myInfo: info }),
      deleteLoginInfo: () => set({ myInfo: null }),
    }),
    {
      name: 'login-store',
      partialize: (state) => ({
        myInfo: state.myInfo,
      }),
    },
  ),
);
