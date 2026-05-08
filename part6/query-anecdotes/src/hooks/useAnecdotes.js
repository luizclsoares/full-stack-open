import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAnecdotes,
  createAnecdote,
  updateAnecdote,
} from "../services/anecdotes";

import { useContext } from "react";
import NotificationContext from "../NotificationContext";

export const useAnecdotes = () => {
  const queryClient = useQueryClient();

  const { setNotification } = useContext(NotificationContext);

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(["anecdotes"]);
      queryClient.setQueryData(["anecdotes"], anecdotes.concat(anecdote));
    },
    onError: () => {
      setNotification(`Too short anecdote, must have length 5 or more`);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    },
  });

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
    },
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addAnecdote: (content) => newAnecdoteMutation.mutate({ content, votes: 0 }),
    updateAnecdote: (anecdote) =>
      updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }),
  };
};
