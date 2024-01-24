import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostItem from "./PostItem";
import SortButton from "./SortButton";
import SearchBar from "./SearchBar";
import {
  fetchPosts,
  sortByDate,
  searchPosts,
} from "../features/posts/postsSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.data);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  const [sortOrder, setSortOrder] = useState("newer");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  useEffect(() => {
    // Only dispatch searchPosts if searchTerm is non-empty
    if (searchTerm !== "") {
      dispatch(searchPosts(searchTerm));
    } else {
      // If searchTerm is empty, refetch all posts
      dispatch(fetchPosts());
    }
  }, [dispatch, searchTerm]);

  const handleSortChange = useCallback(
    (order) => {
      setSortOrder(order);
      dispatch(sortByDate(order));
    },
    [dispatch]
  );

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <SearchBar searchTerm={searchTerm} onChange={handleSearchChange} />
      <SortButton sortOrder={sortOrder} onChange={handleSortChange} />

      <div className="flex flex-wrap gap-8 -mx-2">
        {posts && posts.length > 0 ? (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
