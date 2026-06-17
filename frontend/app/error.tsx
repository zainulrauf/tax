"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">
        Something went wrong
      </h1>

      <p className="mt-4">
        {error.message}
      </p>

      <button
        onClick={reset}
        className="mt-6 bg-black text-white px-5 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}