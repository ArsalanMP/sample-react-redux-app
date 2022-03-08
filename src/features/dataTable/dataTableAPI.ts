import axios from 'axios';
import { IPost } from './interface';

export const getPosts = async () => {
  let url = `http://jsonplaceholder.typicode.com/posts`;
  const res = await axios.get(url);
  return res.data;
};

export const createPost = async (post: IPost) => {
  let url = `http://jsonplaceholder.typicode.com/posts`;
  const res = await axios.post(url, post);
  return res.data;
};

export const updatePost = async (post: IPost) => {
  let url = `http://jsonplaceholder.typicode.com/posts/${post.id}`;
  const res = await axios.put(url, post);
  return res.data;
};

export const deletePost = async (post: IPost) => {
  let url = `http://jsonplaceholder.typicode.com/posts/${post.id}`;
  const res = await axios.delete(url);
  return res.data;
};
