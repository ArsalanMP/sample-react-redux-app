import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { setMessage } from '../message/messageSlice';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from './dataTableAPI';
import { IPost } from './interface';

export interface TableState {
  posts: IPost[];
  loading: boolean;
  openPostFormModal: boolean;
  openDeleteModal: boolean;
  selectedPost: IPost | undefined;
}

const initialState: TableState = {
  posts: [],
  loading: false,
  openPostFormModal: false,
  openDeleteModal: false,
  selectedPost: undefined,
};

export const getPostsAsync = createAsyncThunk(
  'datatable/getPosts',
  async (_, { dispatch }) => {
    try {
      return await getPosts();
    } catch (error: any) {
      dispatch(setMessage(error.message));
      return [];
    }
  }
);

export const createPostAsync = createAsyncThunk(
  'datatable/createPost',
  async (post: IPost, { dispatch }) => {
    try {
      return await createPost(post);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  }
);

export const updatePostAsync = createAsyncThunk(
  'datatable/updatePost',
  async (post: IPost, { dispatch }) => {
    try {
      return await updatePost(post);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  }
);

export const deletePostAsync = createAsyncThunk(
  'datatable/deletePost',
  async (post: IPost, { dispatch }) => {
    try {
      return await deletePost(post);
    } catch (error: any) {
      dispatch(setMessage(error.message));
    }
  }
);

export const dataTableSlice = createSlice({
  name: 'datatable',
  initialState,
  reducers: {
    showCreateModal: (state) => {
      state.openPostFormModal = true;
    },
    showUpdateModal: (state, action: PayloadAction<IPost>) => {
      state.openPostFormModal = true;
      state.selectedPost = action.payload;
    },
    showDeleteModal: (state, action: PayloadAction<IPost>) => {
      state.openDeleteModal = true;
      state.selectedPost = action.payload;
    },
    closeModals: (state, action: PayloadAction<boolean>) => {
      state.openPostFormModal = false;
      state.openDeleteModal = false;
      if (action.payload) {
        // Send true as action payload if you want to deselect the post and sent false if you want to delete or update it
        state.selectedPost = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = [...state.posts, action.payload];
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        //Find index of specific post using findIndex method and put new post in it.
        const postIndex = state.posts.findIndex(
          (obj) => obj.id == state.selectedPost?.id
        );
        state.posts[postIndex] = action.payload;
        state.selectedPost = undefined;
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = state.posts.filter(
          (post) => post.id !== state.selectedPost?.id
        );
        state.selectedPost = undefined;
      });
  },
});

export const datatableState = (state: RootState) => state.dataTable;

export const {
  showCreateModal,
  showDeleteModal,
  showUpdateModal,
  closeModals,
} = dataTableSlice.actions;

export default dataTableSlice.reducer;
