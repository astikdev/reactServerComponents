"use client";

import { useState } from "react";
import inspirations from "./inspirations.ts";
import FancyText from "./FancyText";

export default function InspirationGenerator({
  children,
}: {
  children: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const quote = inspirations[index];
  const next = () => setIndex((index + 1) % inspirations.length);

  return (
    <>
      <p className="text-lg font-medium text-gray-900 dark:text-white">
        Your inspirational quote is:
      </p>
      <FancyText text={quote} />
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        onClick={next}
      >
        Inspire me again
      </button>
      {children}
    </>
  );
}
