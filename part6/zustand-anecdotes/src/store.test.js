import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock("./services/anecdotes", () => ({
  default: {
    getAll: vi.fn(),
  },
}));

import anecdoteService from "./services/anecdotes";
import useAnecdoteStore, { useAnecdotes, useAnecdoteActions } from "./store";

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [] });
  vi.clearAllMocks();
});

describe("useAnecdoteActions", () => {
  it("initialize loads anecdotes from service", async () => {
    const mockAnecdotes = [{ id: 1, content: "Random anecdote", votes: 0 }];

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());

    expect(anecdotesResult.current).toEqual(mockAnecdotes);
  });

  it("receives the anecdotes from the store sorted by votes.", async () => {
    const mockAnecdotes = [
      {
        content: "If it hurts, do it more often",
        id: "47145",
        votes: 0,
      },
      {
        content: "Adding manpower to a late software project makes it later!",
        id: "21149",
        votes: 1,
      },
      {
        content:
          "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        id: "69581",
        votes: 2,
      },
    ];

    const sortedAnecdotes = mockAnecdotes.toSorted((a, b) => b.votes - a.votes);

    anecdoteService.getAll.mockResolvedValue(mockAnecdotes);

    const { result } = renderHook(() => useAnecdoteActions());

    await act(async () => {
      await result.current.initialize();
    });

    const { result: anecdotesResult } = renderHook(() => useAnecdotes());
    expect(anecdotesResult.current).toEqual(sortedAnecdotes);
  });
});
