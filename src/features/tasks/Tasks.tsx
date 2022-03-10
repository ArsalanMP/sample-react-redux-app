import {
  Box,
  Button,
  IconButton,
  Paper,
  Typography,
} from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  tasksState,
  createTask,
  updateTask,
  deleteTask,
  showCreateModal,
  showDeleteModal,
  showUpdateModal,
  closeModals,
} from './tasksSlice';
import {
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import DeleteModal from '../../components/DeleteModal';
import TaskFormModal from './TaskFormModal';
import { ITask } from './interface';

const Tasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, openDeleteModal, openTaskFormModal, selectedTask } =
    useAppSelector(tasksState);

  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" margin={4}>
      <Box display="flex" flexDirection={'row-reverse'}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            dispatch(showCreateModal());
          }}
        >
          Add Task
        </Button>
      </Box>
      <Box marginTop={2}>
        {tasks.length < 1 ? (
          <Typography>There is no item, please create one</Typography>
        ) : (
          <Box display="flex" flexDirection="column">
            {tasks.map((task) => (
              <Paper
                elevation={5}
                classes={{
                  root: classes.card,
                }}
              >
                <Box flex={1} display="flex" alignItems="center">
                  <Typography
                    variant="h5"
                    classes={{
                      h5: task.done ? classes.done : classes.undone,
                    }}
                    color={
                      task.done ? 'textSecondary' : 'textPrimary'
                    }
                  >
                    {task.description}
                  </Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() => {
                      dispatch(showUpdateModal(task));
                    }}
                  >
                    <Edit color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      dispatch(showDeleteModal(task));
                    }}
                  >
                    <Delete color="secondary" />
                  </IconButton>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Box>
      {openDeleteModal && (
        <DeleteModal
          itemTitle={selectedTask?.description ?? ''}
          handleCancel={() => {
            dispatch(closeModals());
          }}
          handleConfirm={() => {
            if (selectedTask) {
              dispatch(deleteTask(selectedTask));
            }
            dispatch(closeModals());
          }}
        />
      )}
      {openTaskFormModal && (
        <TaskFormModal
          task={selectedTask}
          handleCancel={() => {
            dispatch(closeModals());
          }}
          handleSubmit={(newTask: ITask) => {
            if (selectedTask && newTask.id !== '') {
              dispatch(updateTask(newTask));
            } else {
              dispatch(createTask(newTask));
            }
            dispatch(closeModals());
          }}
        />
      )}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tasks: {
      display: 'flex',
      backgroundColor: theme.palette.background.paper,
    },
    card: {
      marginTop: 10,
      padding: 8,
      display: 'flex',
    },
    done: {
      textDecoration: 'line-through',
    },
    undone: {
      textDecoration: 'auto',
    },
  })
);

export default Tasks;
