import { useMutation } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import UPDATE_TODO from '../graphql/mutations/updateToDo';
import ToDo from '../models/ToDo';
import GET_ALL_TODOS from './../graphql/query/getAllToDos';

export interface ToDoDialogProps {
  open: boolean;
  todo: ToDo;
  onClose: () => void;
  refetch: () => void;
}

const ToDoDialog = ({ onClose, open, todo, refetch }: ToDoDialogProps) => {
  const [newContent, setNewContent] = useState(todo.content);
  const [updateToDo] = useMutation(UPDATE_TODO, { refetchQueries: [{ query: GET_ALL_TODOS }], awaitRefetchQueries: true });

  const handleSave = () => {
    updateToDo({ variables: { updateTodoInput: { id: todo.id, content: newContent } } });
    refetch();
    onClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle id='form-dialog-title'>Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id={`${todo.id}-textfield`}
            label='Text'
            type='text'
            autoComplete='off'
            fullWidth
            value={newContent}
            onChange={(val) => setNewContent(val.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onClose();
            }}
            color='primary'>
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
