import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useCachingFetch, wipeCache } from "./cachingFetch";
import { beforeEach, describe, it } from "node:test";

// Mock global fetch
global.fetch = jest.fn() ;

const TestComponent = ({ url }: { url: string }) => {
  const { data, isLoading, error } = useCachingFetch(url);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return <div>Data: {JSON.stringify(data)}</div>;
};

describe("useCachingFetch", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    wipeCache();
  });

  it("fetches and renders data", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "Hello World" }),
    });

    render(<TestComponent url="/api/hello" />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText(/Data:.*Hello World/)).toBeInTheDocument()
    );
  });

  it("uses cached data on subsequent calls", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "From Cache" }),
    });

    // First render to cache the response
    render(<TestComponent url="/api/cache" />);
    await waitFor(() =>
      expect(screen.getByText(/From Cache/)).toBeInTheDocument()
    );

    jest.clearAllMocks(); // ensure fetch is not called again

    // Second render should use cached data
    render(<TestComponent url="/api/cache" />);
    await waitFor(() =>
      expect(screen.getByText(/From Cache/)).toBeInTheDocument()
    );

    expect(fetch).not.toHaveBeenCalled();
  });

  it("handles fetch errors", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    render(<TestComponent url="/api/fail" />);
    await waitFor(() =>
      expect(screen.getByText(/Failed with status 500/)).toBeInTheDocument()
    );
  });
});