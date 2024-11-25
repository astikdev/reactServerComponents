"use server";
import React, { Suspense } from "react";
import { getPostDetails } from "../lib/api/product";
import Loader from "../lib/component/Loader";
import PostActions from "../lib/component/PostActions";

export default async function page({ params }: { params: { id: string } }) {
  const response = await getPostDetails(params.id); // Corrected this line

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sticky top-0 bg-white py-4 shadow z-10">
        {`Posts ID: ${params.id}`}
      </h1>

      <Suspense fallback={<Loader />}>
        <div className="space-y-6 p-10">
          <a
            key={response.id}
            // href={`/${response.id}`}
            className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform "
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
              <h2 className="text-2xl font-semibold mb-1">{`Post ID: ${response.id}`}</h2>
              <p className="text-lg">{response.title}</p>
            </div>

            <div className="p-6 bg-white">
              <p className="text-gray-700 text-sm">{response.body}</p>
            </div>

            <div className="p-4 bg-gray-100 text-gray-500 text-xs flex justify-between items-center">
              <span>Click to read more...</span>
              <span className="text-gray-400">ID: {response.id}</span>
            </div>
          </a>
          {/* Insert the PostActions component here */}
          <PostActions
            postId={+response.id}
            userId={+response.userId}
            initialTitle={response.title}
            initialBody={response.body}
          />
        </div>
      </Suspense>
    </div>
  );
}
