"use client";

import React, { useState } from "react";
import { LoadingState } from "../type/api/api";
import { deletePost, editPostDetails, getPostDetails } from "../api/product";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

interface PostActionsProps {
  postId: string;
  userId: string;
  initialTitle: string;
  initialBody: string;
}

const PostActions: React.FC<PostActionsProps> = ({
  postId,
  userId,
  initialTitle,
  initialBody,
}) => {
  const router = useRouter(); // Initialize the router
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState<LoadingState>(LoadingState.NONE);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isSubmitLoading = loading === LoadingState.SUBMIT;
  const isDeleteLoading = loading === LoadingState.DELETE;

  // Handle delete confirmation
  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    // Call API to delete the post here
    console.log("Post updated:", { title });
    // setIsEditMode(false);
    try {
      setLoading(LoadingState.DELETE);
      await deletePost(postId);
      router.replace("/");
    } catch (error: any) {
      console.log("error: ", error);
    }
    setLoading(LoadingState.NONE);
    setIsDeleteModalOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

  // Handle edit mode
  const handleEdit = () => {
    setIsEditMode(true);
  };

  const saveEdit = async () => {
    // Call API to update the post here
    console.log("Post updated:", { title });
    // setIsEditMode(false);
    try {
      setLoading(LoadingState.SUBMIT);
      const response = await editPostDetails({
        userId: +userId,
        id: +postId,
        title: title,
        body: body,
      });
    } catch (error: any) {
      console.log("error: ", error);
    }
    setLoading(LoadingState.NONE);
  };

  return (
    <div className=" gap-4">
      <div className="flex gap-4">
        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Edit Post
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete Post
        </button>
      </div>
      {/* Modal for Delete Confirmation */}
      {isDeleteModalOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={cancelDelete} // Close modal when clicking backdrop
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside modal
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Are you sure you want to delete this post?
            </h2>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2"
              >
                {isDeleteLoading && <Loader />}
                <span>Yes, Delete</span>
              </button>
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditMode && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              placeholder="Enter the title here" // Added placeholder
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md text-gray-600"
              rows={4}
              placeholder="Enter the body content here" // Added placeholder
            ></textarea>
          </div>
          <div className="flex gap-4">
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center gap-2"
            >
              {isSubmitLoading && <Loader />}
              <span>Save Changes</span>
            </button>
            <button
              onClick={() => setIsEditMode(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostActions;
