import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MessageState {
  value: string;
}

const initialState: MessageState = {
  value: '',
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.value = action.payload;
    },
    clearMessage: (state) => {
      state.value = '';
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setMessage, clearMessage } = actions;

export const message = (state: RootState) => state.message.value;

export default reducer;
