import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsAPI from "./postsApi";

const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await postsAPI.getAllPosts();
  return response;
});

const incrementLikes = createAsyncThunk(
  "posts/incrementLikes",
  async (postId) => {
    const response = await postsAPI.incrementLikes(postId);
    return response;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: { data: [], status: "idle", error: null },
  reducers: {
    sortByDate: (state, action) => {
      const order = action.payload;
      state.data.sort((a, b) =>
        order === "newer" ? b.id - a.id : a.id - b.id
      );
    },
    searchPosts: (state, action) => {
      const searchTerm = action.payload.toLowerCase();
      state.data = state.data.filter((post) =>
        post.title.toLowerCase().includes(searchTerm)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(incrementLikes.pending, (state) => {
        // Handle loading state for incrementLikes if needed.
        state.status = "loading";
        state.error = null;
      })
      .addCase(incrementLikes.fulfilled, (state, action) => {
        const updatedPost = action.payload; // Assuming the API returns the updated post with the new like count
        const index = state.data.findIndex(
          (post) => post.id === updatedPost.id
        );
        if (index !== -1) {
          state.data[index].likes = updatedPost.likes;
        }
        state.status = "succeeded";
      })
      .addCase(incrementLikes.rejected, (state, action) => {
        // Handle error state for incrementLikes if needed.
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { sortByDate, searchPosts } = postsSlice.actions;

export { fetchPosts, incrementLikes }; // Exporting thunks for external use

export default postsSlice.reducer;
