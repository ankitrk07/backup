import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info";

export interface Toast {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  /** milliseconds before auto-dismiss */
  duration: number;
}

type ToastInput = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

interface ToastState {
  toasts: Toast[];
  push: (toast: ToastInput) => number;
  dismiss: (id: number) => void;
}

let nextId = 1;
const MAX_VISIBLE = 4;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  push: (toast) => {
    const id = nextId++;
    const entry: Toast = {
      id,
      title: toast.title,
      description: toast.description,
      variant: toast.variant ?? "info",
      duration: toast.duration ?? 4000,
    };
    set((state) => ({ toasts: [...state.toasts, entry].slice(-MAX_VISIBLE) }));
    return id;
  },
  dismiss: (id) => set((state) => ({ toasts: state.toasts.filter((toast) => toast.id !== id) })),
}));

/** Use anywhere, including outside React components. */
export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, variant: "success" }),
  error: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, variant: "error", duration: 6000 }),
  info: (title: string, description?: string) =>
    useToastStore.getState().push({ title, description, variant: "info" }),
};