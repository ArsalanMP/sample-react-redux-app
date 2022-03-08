import { Box } from '@material-ui/core';
import MaterialTable from 'material-table';
import { forwardRef, useEffect } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  closeModals,
  createPostAsync,
  datatableState,
  deletePostAsync,
  getPostsAsync,
  showCreateModal,
  showDeleteModal,
  showUpdateModal,
  updatePostAsync,
} from './dataTableSlice';
import { IPost } from './interface';
import { clearMessage, message } from '../message/messageSlice';
import DeleteModal from './DeleteModal';
import PostFormModal from './PostFormModal';

const tableIcons = {
  Filter: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  SortArrow: forwardRef<SVGSVGElement, {}>((props, ref) => (
    <ArrowDownward {...props} ref={ref} />
  )),
};

const DataTable = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    openPostFormModal,
    openDeleteModal,
    loading,
    selectedPost,
  } = useAppSelector(datatableState);
  const messageValue = useAppSelector(message);

  useEffect(() => {
    dispatch(getPostsAsync());
  }, []);

  if (messageValue) {
    dispatch(clearMessage());
    alert(messageValue);
  }

  const editablePosts = posts.map((o: IPost) => ({
    ...o,
  }));

  return (
    <Box width="100%" height="100%">
      <MaterialTable
        icons={tableIcons}
        title="Data table"
        isLoading={loading}
        actions={[
          {
            icon: () => <Edit color="primary" />,
            tooltip: 'Edit Post',
            onClick: (event, rowData) => {
              dispatch(showUpdateModal(rowData as IPost));
            },
          },
          {
            icon: () => <DeleteOutline color="secondary" />,
            tooltip: 'Delete Post',
            onClick: (event, rowData) => {
              dispatch(showDeleteModal(rowData as IPost));
            },
          },
          {
            icon: () => <AddBox color="primary" />,
            tooltip: 'Create Post',
            position: 'toolbar',
            onClick: (event) => {
              dispatch(showCreateModal());
            },
          },
        ]}
        columns={[
          {
            title: 'Title',
            field: 'title',
            filtering: false,
          },
          {
            title: 'Body',
            field: 'body',
            filtering: false,
          },
          {
            title: 'User Id',
            field: 'userId',
            type: 'numeric',
            filtering: true,
          },
        ]}
        data={editablePosts}
        options={{
          search: false,
          filtering: true,
          actionsColumnIndex: -1,
          toolbar: true,
        }}
      />
      {openDeleteModal && (
        <DeleteModal
          itemTitle={selectedPost?.title ?? ''}
          handleCancel={() => {
            dispatch(closeModals(true));
          }}
          handleConfirm={() => {
            if (selectedPost) {
              dispatch(deletePostAsync(selectedPost));
            }
            dispatch(closeModals(false));
          }}
        />
      )}
      {openPostFormModal && (
        <PostFormModal
          post={selectedPost}
          handleCancel={() => {
            dispatch(closeModals(true));
          }}
          handleSubmit={(newPost: IPost) => {
            if (selectedPost && newPost.id !== -1) {
              dispatch(updatePostAsync(newPost));
            } else {
              dispatch(createPostAsync(newPost));
            }
            dispatch(closeModals(false));
          }}
        />
      )}
    </Box>
  );
};

export default DataTable;
