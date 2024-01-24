import axios from "axios";

const baseURL = "http://localhost:5000/api/posts";

const getAllPosts = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const incrementLikes = async (postId) => {
  const response = await axios.put(`${baseURL}/${postId}/like`);
  return response.data;
};

export default {
  getAllPosts,
  incrementLikes,
};
