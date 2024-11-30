'use client';

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold text-paprika-red mb-4">Something went wrong!</h2>
      <button
        onClick={() => window.location.reload()}
        className="bg-paprika-red hover:bg-paprika-red-dark text-white px-6 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
} 