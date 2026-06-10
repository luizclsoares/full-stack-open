import { create } from "zustand";

const useNotificationStore = create((set) => ({
  message: "",
  type: "",
  actions: {
    notification: (msg) => {
      set((state) => ({ message: (state.message = msg) }));
      setTimeout(() => {
        set((state) => ({ message: (state.message = "") }));
      }, 5000);
    },
    type: (type) => {
      set((state) => ({ type: (state.type = type) }));
      setTimeout(() => {
        set((state) => ({ type: (state.type = "") }));
      }, 5000);
    },
  },
}));

export const useNotificationMessage = () =>
  useNotificationStore((state) => state.message);

export const useNotificationType = () =>
  useNotificationStore((state) => state.type);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
