import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type LoginStore = {
  myInfo: User | null;
  accessToken: string;
  saveLoginInfo: (info: User, token: string) => void;
  updateLoginInfo: (info: User) => void;
  deleteLoginInfo: () => void;
};

export const useLoginStore = create<LoginStore>()(
  persist(
    (set) => ({
      myInfo: null,
      accessToken: '',
      saveLoginInfo: (info, token) => set({ myInfo: info, accessToken: token }),
      updateLoginInfo: (info) =>
        set((state) => ({ myInfo: info, accessToken: state.accessToken })),
      deleteLoginInfo: () => set({ myInfo: null, accessToken: '' }),
    }),
    {
      name: 'login-store',
      partialize: (state) => ({
        myInfo: state.myInfo,
        accessToken: state.accessToken,
      }),
    },
  ),
);
