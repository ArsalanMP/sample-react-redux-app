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
import { datatableState, getPostsAsync } from './dataTableSlice';
import { IPost } from './interface';
import { clearMessage, message } from '../message/messageSlice';

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

const Auth = () => {
  const dispatch = useAppDispatch();
  const tableState = useAppSelector(datatableState);
  const messageValue = useAppSelector(message);

  useEffect(() => {
    dispatch(getPostsAsync());
  }, []);

  if (messageValue) {
    dispatch(clearMessage());
    alert(messageValue);
  }

  const editablePosts = tableState.posts.map((o: IPost) => ({
    ...o,
  }));

  return (
    <Box width="100%" height="100%">
      <MaterialTable
        icons={tableIcons}
        title="Data table"
        isLoading={tableState.loading}
        actions={[
          {
            icon: () => <Edit color="primary" />,
            tooltip: 'Edit Post',
            onClick: (event, rowData) => {
              alert('You want to edit ' + (rowData as IPost).title);
            },
          },
          {
            icon: () => <DeleteOutline color="secondary" />,
            tooltip: 'Delete User',
            onClick: (event, rowData) => {
              alert('You want to delete ' + (rowData as IPost).title);
            },
          },
          {
            icon: () => <AddBox color="primary" />,
            tooltip: 'Create Post',
            position: 'toolbar',
            onClick: (event, rowData) => {
              // Do save operation
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
    </Box>
  );
};

export default Auth;
