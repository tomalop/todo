import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ToDo from '../models/ToDo';
import { useMutation } from '@apollo/react-hooks';
import UPDATE_TODO from '../graphql/mutations/updateToDo';

export interface ToDoDialogProps {
  open: boolean;
  todo: ToDo;
  onClose: () => void;
  refetch: () => void
}

const ToDoDialog = ({ onClose, open, todo, refetch }: ToDoDialogProps) => {
  const [newContent, setNewContent] = useState(todo.content);

  const [updateToDo] = useMutation(UPDATE_TODO);

  const handleSave = () => {
    updateToDo({ variables: { updateTodoInput: { id: todo.id, content: newContent } } });
    refetch();
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Text'
            type='text'
            fullWidth
            value={newContent}
            onChange={(val) => setNewContent(val.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onClose()} color='primary'>
            Cancel
          </Button>
          <Button onClick={() => handleSave()} color='primary'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ToDoDialog;
