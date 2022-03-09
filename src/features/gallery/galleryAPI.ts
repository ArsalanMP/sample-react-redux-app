import axios from 'axios';
import { IPhoto } from './interface';

export const getPhotos = async (query: string): Promise<IPhoto[]> => {
  let url = 'https://api.unsplash.com/';
  if (query !== '') {
    url = `https://api.unsplash.com/search/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&per_page=30&query=${query}`;
  } else {
    url = `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&per_page=30`;
  }

  const { data } = await axios.get(url);

  return query !== '' ? data.results : data;
};
