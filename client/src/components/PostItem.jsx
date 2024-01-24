import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { incrementLikes } from "../features/posts/postsSlice";

// eslint-disable-next-line react/display-name
const PostItem = React.memo(
  ({ post }) => {
    const dispatch = useDispatch();

    const handleLikeClick = useCallback(() => {
      dispatch(incrementLikes(post.id));
    }, [dispatch, post.id]);

    return (
      <div className="w-96 rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition duration-300 mb-8">
        <img
          className="w-full h-56 object-cover object-center"
          src={post.image}
          alt={post.title}
        />
        <div className="px-6 py-4">
          <h2 className="font-bold text-xl mb-2">{post.title}</h2>
          <div className="flex items-center mb-4">
            <p className="text-gray-700 text-sm mr-2">{post.likes} Likes</p>
            <button
              onClick={handleLikeClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Like
            </button>
          </div>
          <p className="text-gray-600 text-base">{post.description}</p>
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => {
    // Memoization based on relevant properties (e.g., post.id and post.likes)
    return (
      prevProps.post.id === nextProps.post.id &&
      prevProps.post.likes === nextProps.post.likes
    );
  }
);

export default PostItem;
