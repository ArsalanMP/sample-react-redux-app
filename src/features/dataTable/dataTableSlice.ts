import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setMessage } from '../message/messageSlice';
import { getPosts } from './dataTableAPI';
import { IPost } from './interface';

export interface TableState {
  posts: IPost[];
  loading: boolean;
}

const initialState: TableState = {
  posts: [],
  loading: false,
};

export const getPostsAsync = createAsyncThunk(
  'datatable/getPosts',
  async (_, { dispatch }) => {
    try {
      const response = await getPosts();
      return response;
    } catch (error: any) {
      dispatch(setMessage(error.message));
      return [];
    }
  }
);

export const dataTableSlice = createSlice({
  name: 'datatable',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      });
  },
});

export const datatableState = (state: RootState) => state.dataTable;

export default dataTableSlice.reducer;
