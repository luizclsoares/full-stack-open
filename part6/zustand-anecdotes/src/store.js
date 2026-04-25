import { create } from "zustand";
import anecdotesService from "./services/anecdotes";

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: "",
  actions: {
    vote: async (id) => {
      const anecdote = get().anecdotes.find((anecdote) => anecdote.id === id);
      const updatedAnecdote = await anecdotesService.update(id, {
        ...anecdote,
        votes: anecdote.votes + 1,
      });

      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id !== id ? anecdote : updatedAnecdote,
        ),
      }));
    },
    add: async (content) => {
      const anecdote = await anecdotesService.create(content);
      set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await anecdotesService.getAll();
      set(() => ({ anecdotes }));
    },
    remove: async () => {
      const anecdotes = get().anecdotes;

      for (let i = 0; i < anecdotes.length; i++) {
        if (anecdotes[i].votes === 0) {
          await anecdotesService.remove(anecdotes[i].id);
        }
      }

      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.votes !== 0),
      }));
    },
  },
}));

const useNotificationStore = create((set) => ({
  message: "",
  actions: {
    notification: (msg) => {
      set((state) => ({ message: (state.message = msg) }));
      setTimeout(() => {
        set((state) => ({ message: (state.message = "") }));
      }, 5000);
    },
  },
}));

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);

  return !filter
    ? anecdotes
    : anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .trim()
          .includes(filter.toLowerCase().trim()),
      );
};
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);

export const useNotification = () =>
  useNotificationStore((state) => state.message);

export const useNotificationActions = () =>
  useNotificationStore((state) => state.actions);
