import { create } from "zustand";
import blogService from "./services/blogs";

const useBlogListStore = create((set) => ({
  blogs: [],
  actions: {
    initialize: async () => {
      const blogs = await blogService.getAll();
      set(() => ({ blogs }));
    },
    add: async (blog, user) => {
      const newBlog = await blogService.create(blog);
      newBlog.user = user;

      set((state) => ({ blogs: state.blogs.concat(newBlog) }));
    },
  },
}));

export default useBlogListStore;

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

export const useBlogList = () =>
  useBlogListStore((state) => state.blogs.sort((a, b) => b.likes - a.likes));

export const useBlogListActions = () =>
  useBlogListStore((state) => state.actions);

export const useNotificationMessage = () =>
  useNotificationStore((state) => state.message);

export const useNotificationType = () =>
  useNotificationStore((state) => state.type);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
