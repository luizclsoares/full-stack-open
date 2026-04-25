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
