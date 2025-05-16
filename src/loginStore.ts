import { create } from 'zustand';

type LoginStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
};

export const useLoginStore = create<LoginStore>((set) => ({
  isLoggedIn: !!localStorage.getItem('accessToken'),
  login: () => {
    set({ isLoggedIn: true });
  },
  logout: () => {
    set({ isLoggedIn: false });
  },
}));
