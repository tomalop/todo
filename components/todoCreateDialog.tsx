import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import CREATE_TODO from './../graphql/mutations/createToDo';
import { useMutation } from '@apollo/client';
import GET_ALL_TODOS from "./../graphql/query/getAllToDos";

export interface ToDoCreateDialogProps {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}

const TodoCreateDialog = ({ onClose, open, refetch }: ToDoCreateDialogProps) => {
  const [newContent, setNewContent] = useState('');
  const [createToDo] = useMutation(CREATE_TODO, { refetchQueries: [{ query: GET_ALL_TODOS }], awaitRefetchQueries: true });

  const handleSave = () => {
    createToDo({ variables: { content: newContent } });
    refetch();
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id='form-dialog-title'>Add New ToDo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='create-textfield'
            label='Text'
            type='text'
            autoComplete="off"
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

export default TodoCreateDialog;
