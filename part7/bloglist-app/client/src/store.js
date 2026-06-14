import { create } from "zustand";
import blogService from "./services/blogs";
import loginService from "./services/login";

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
    update: async (blog) => {
      const updatedBlog = await blogService.update(blog);
      updatedBlog.user = blog.user;

      set((state) => ({
        blogs: state.blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)),
      }));
    },
    remove: async (id) => {
      await blogService.remove(id);

      set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) }));
    },
  },
}));

export default useBlogListStore;

const useNotificationStore = create((set) => ({
  message: "",
  type: "",
  actions: {
    notification: (msg) => {
      set((state) => ({ message: msg }));
      setTimeout(() => {
        set((state) => ({ message: (state.message = "") }));
      }, 5000);
    },
    type: (type) => {
      set((state) => ({ type }));
      setTimeout(() => {
        set((state) => ({ type: (state.type = "") }));
      }, 5000);
    },
  },
}));

const useLoginStore = create((set) => ({
  user: null,
  actions: {
    login: async (username, password) => {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      set((state) => ({ user: user }));
    },
    logout: () => {
      window.localStorage.removeItem("loggedBlogAppUser");
      set((state) => ({ user: null }));
    },
    initialize: (user) => {
      const userJSON = window.localStorage.getItem("loggedBlogAppUser");

      if (userJSON) {
        const user = JSON.parse(userJSON);
        blogService.setToken(user.token);
        set((state) => ({ user: user }));
      }
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

export const useLogin = () => useLoginStore((state) => state.user);

export const useLoginActions = () => useLoginStore((state) => state.actions);
