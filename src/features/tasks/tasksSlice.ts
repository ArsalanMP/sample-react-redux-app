import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ITask } from './interface';
import store from 'store';

const localTasks = store.get('tasks', []);

export interface TasksState {
  tasks: ITask[];
  openTaskFormModal: boolean;
  openDeleteModal: boolean;
  selectedTask: ITask | undefined;
}

const initialState: TasksState = {
  tasks: localTasks,
  openDeleteModal: false,
  openTaskFormModal: false,
  selectedTask: undefined,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    showCreateModal: (state) => {
      state.openTaskFormModal = true;
    },
    showUpdateModal: (state, action: PayloadAction<ITask>) => {
      state.openTaskFormModal = true;
      state.selectedTask = action.payload;
    },
    showDeleteModal: (state, action: PayloadAction<ITask>) => {
      state.openDeleteModal = true;
      state.selectedTask = action.payload;
    },
    closeModals: (state) => {
      state.openTaskFormModal = false;
      state.openDeleteModal = false;
      state.selectedTask = undefined;
    },
    createTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = [action.payload, ...state.tasks];
      store.set('tasks', state.tasks);
    },
    updateTask: (state, action: PayloadAction<ITask>) => {
      const taskIndex = state.tasks.findIndex(
        (obj) => obj.id == action.payload.id
      );
      state.tasks[taskIndex] = action.payload;
      store.set('tasks', state.tasks);
    },
    deleteTask: (state, action: PayloadAction<ITask>) => {
      state.tasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      store.set('tasks', state.tasks);
    },
  },
});

const { actions } = tasksSlice;

export const {
  createTask,
  updateTask,
  deleteTask,
  showCreateModal,
  showDeleteModal,
  showUpdateModal,
  closeModals,
} = actions;

export const tasksState = (state: RootState) => state.tasks;

export default tasksSlice.reducer;
