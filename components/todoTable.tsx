import { ApolloError, useMutation } from '@apollo/react-hooks';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import ToDo from '../models/ToDo';
import DELETE_TODO from './../graphql/mutations/deleteToDo';
import ToDoDialog from './todoDialog';
import GET_ALL_TODOS from './../graphql/query/getAllToDos';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  formButton: {
    marginRight: 8,
  },
});

export interface ToDoTableProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  refetch: () => void;
}

const ToDoTable = ({ loading, error, data, refetch }: ToDoTableProps) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error. {error.message}</p>;

  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [deleteToDo] = useMutation(DELETE_TODO, { refetchQueries: [{ query: GET_ALL_TODOS }], awaitRefetchQueries: true });

  const handleDelete = (id: string) => {
    deleteToDo({ variables: { id } });
    refetch();
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Content</TableCell>
            <TableCell align='right'>Last Modified</TableCell>
            <TableCell align='right'>Created</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.getAllToDos.map((todo: ToDo) => (
            <TableRow key={todo.id}>
              <TableCell>{todo.id}</TableCell>
              <TableCell component='th' scope='row'>
                {todo.content}
              </TableCell>
              <TableCell align='right'>{todo.lastModified.toString()}</TableCell>
              <TableCell align='right'>{todo.created.toString()}</TableCell>
              <TableCell align='right'>
                <Button className={classes.formButton} variant='contained' color='secondary' onClick={() => setOpen(true)}>
                  Edit
                </Button>
                <Button variant='contained' color='secondary' onClick={() => handleDelete(todo.id)}>
                  Delete
                </Button>
                <ToDoDialog todo={todo} open={open} onClose={() => setOpen(false)} refetch={refetch} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

ToDoTable.defaultProps = {
  todos: [],
};

export default ToDoTable;
