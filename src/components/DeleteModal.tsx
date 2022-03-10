import { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

type IDeleteModalProps = {
  itemTitle: string;
  handleConfirm: VoidFunction;
  handleCancel: VoidFunction;
};

const DeleteModal: FC<IDeleteModalProps> = (props) => {
  const { handleConfirm, handleCancel, itemTitle } = props;
  return (
    <Dialog
      open
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Are you sure?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete '{itemTitle}'?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
