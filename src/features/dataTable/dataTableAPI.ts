import axios from 'axios';

export const getPosts = async () => {
  let url = `http://jsonplaceholder.typicode.com/posts`;
  const res = await axios.get(url);
  return res.data;
};
