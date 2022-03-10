import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  TextField,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { ITask } from './interface';

interface ITaskFormModalProps {
  task?: ITask;
  handleCancel: VoidFunction;
  handleSubmit: (task: ITask) => void;
}

interface ITaskFormData {
  description: string;
  done: boolean;
}

const initialErrorState = Object.freeze({
  description: '',
});

const TaskFormModal: FC<ITaskFormModalProps> = (props) => {
  const { task, handleCancel, handleSubmit } = props;

  const [errors, setErrors] = useState(initialErrorState);
  const [formData, setFormData] = useState<ITaskFormData>({
    description: task?.description ?? '',
    done: task?.done ?? false,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    setFormData({
      ...formData,
      description: data,
    });
    console.log(data);

    if (data === '') {
      setErrors({ ...errors, description: 'Item is required' });
    } else {
      setErrors({ ...errors, description: '' });
    }
  };

  const onCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, done: event.target.checked });
  };

  const onSubmitForm = () => {
    if (!errors.description) {
      const newTask: ITask = {
        description: formData.description,
        done: formData.done,
        id: task?.id ?? new Date().toISOString(),
      };
      handleSubmit(newTask);
    }
  };

  return (
    <Dialog
      open
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {task === undefined
          ? 'Create new task'
          : `Update task '${task.description}'`}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          name="description"
          label="Description"
          type="text"
          InputLabelProps={{ shrink: true }}
          value={formData.description}
          error={errors.description !== ''}
          helperText={errors.description}
          onChange={onInputChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.done}
              onChange={onCheckboxChange}
              name="done"
              color="primary"
            />
          }
          label="Is done"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={onSubmitForm} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
