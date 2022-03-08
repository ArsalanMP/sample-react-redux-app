import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import React, { FC, useState } from 'react';
import { IPost } from './interface';

interface IPostFormModalProps {
  post?: IPost;
  handleCancel: VoidFunction;
  handleSubmit: (post: IPost) => void;
}

interface IPostFormData {
  title: string;
  body: string;
  userId: number;
}

const initialErrorState = Object.freeze({
  title: '',
  body: '',
  userId: '',
});

const PostFormModal: FC<IPostFormModalProps> = (props) => {
  const { post, handleCancel, handleSubmit } = props;

  const [errors, setErrors] = useState(initialErrorState);
  const [formData, setFormData] = useState<IPostFormData>({
    title: post?.title ?? '',
    body: post?.body ?? '',
    userId: post?.userId ?? 1,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = e.target.value;
    const name = e.target.name;
    setFormData({
      ...formData,
      [name]: data,
    });
    if (data === '') {
      setErrors({ ...errors, [name]: 'Item is required' });
    } else {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const onSubmitForm = () => {
    if (!errors.body && !errors.title && !errors.userId) {
      const newPost: IPost = {
        title: formData.title,
        body: formData.body,
        userId: formData.userId,
        id: post?.id ?? -1,
      };
      handleSubmit(newPost);
    }
  };

  return (
    <Dialog
      open
      onClose={handleCancel}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {post === undefined
          ? 'Create new post'
          : `Update post '${post.title}'`}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          name="title"
          label="Title"
          type="text"
          InputLabelProps={{ shrink: true }}
          value={formData.title}
          error={errors.title !== ''}
          helperText={errors.title}
          onChange={onInputChange}
        />
        <TextField
          fullWidth
          autoFocus
          margin="dense"
          name="body"
          label="Body"
          type="text"
          InputLabelProps={{ shrink: true }}
          value={formData.body}
          error={errors.body !== ''}
          helperText={errors.body}
          onChange={onInputChange}
        />
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          name="userId"
          label="User id"
          InputLabelProps={{ shrink: true }}
          value={formData.userId}
          error={errors.userId !== ''}
          helperText={errors.userId}
          type="number"
          onChange={onInputChange}
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

export default PostFormModal;
