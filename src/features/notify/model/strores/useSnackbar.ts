// eslint-disable-next-line import/no-extraneous-dependencies
import {
  create,
} from 'zustand'

type SnackbarType = 'success' | 'error' | 'info'

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;

  show: (message: string, type?: SnackbarType) => void;
  hide: () => void;
}

export const useSnackbar = create<SnackbarState>((set) => ({
  open: false,
  message: '',
  type: 'success',

  show: (message, type = 'success') => set({
    open: true,
    message,
    type,
  }),
  hide: () => set({
    open: false,
  }),
}))
