import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setMessage } from '../message/messageSlice';
import { getPhotos } from './galleryAPI';
import { IPhoto } from './interface';

export interface GalleryState {
  photos: IPhoto[];
  loading: boolean;
}

const initialState: GalleryState = {
  photos: [],
  loading: false,
};

export const getPhotosAsync = createAsyncThunk(
  'gallery/getPhotos',
  async (query: string, { dispatch }) => {
    try {
      return await getPhotos(query);
    } catch (error: any) {
      dispatch(setMessage(error.message));
      return [];
    }
  }
);

export const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotosAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPhotosAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
      });
  },
});

export const galleryState = (state: RootState) => state.gallery;

export default gallerySlice.reducer;
