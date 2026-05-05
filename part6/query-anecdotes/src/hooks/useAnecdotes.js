import { useQuery } from "@tanstack/react-query";
import { getAnecdotes } from "../services/anecdotes";

export const useAnecdotes = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
  });

  return {
    anecdotes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  };
};
