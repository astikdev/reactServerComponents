"use server";
import Link from "next/link";
import { getPostsList } from "./lib/api/product";
import { Post } from "./lib/type/api/products";
import { Suspense } from "react";

export default async function Home() {
  const response = await getPostsList();

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="space-y-6">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg overflow-hidden p-6 animate-pulse"
        >
          {/* Skeleton Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>

          {/* Skeleton Body */}
          <div className="p-6 bg-white">
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>

          {/* Skeleton Footer */}
          <div className="p-4 bg-gray-100 text-gray-500 text-xs flex justify-between items-center">
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ))}
    </div>
  );

  const PostCard = ({ post }: { post: Post }) => {
    return (
      <Link
        key={post.id}
        href={`/${post.id}`}
        className="block bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
      >
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
          <h2 className="text-2xl font-semibold mb-1">{`Post ID: ${post.id}`}</h2>
          <p className="text-lg">{post.title}</p>
        </div>

        <div className="p-6 bg-white">
          <p className="text-gray-700 text-sm">{post.body}</p>
        </div>

        <div className="p-4 bg-gray-100 text-gray-500 text-xs flex justify-between items-center">
          <span>Click to read more...</span>
          <span className="text-gray-400">ID: {post.id}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sticky Heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center sticky top-0 bg-white py-4 shadow z-10">
        Posts
      </h1>
      <Suspense fallback={<SkeletonLoader />}>
        {/* Map through posts and render PostCard */}
        <div className="space-y-6 p-10">
          {response.length > 0 &&
            response?.map((item: Post) => (
              <PostCard key={item.id} post={item} />
            ))}
        </div>
      </Suspense>
    </div>
  );
}
