import React, { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import { NextPage } from 'next/types';
import ToDoTable from '../components/todoTable';
import { useQuery } from "@apollo/client";
import GET_ALL_TODOS from "./../graphql/query/getAllToDos";
import TodoCreateDialog from "../components/todoCreateDialog";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  createButton: {
    marginBottom: 16
  }
});


const HomePage: NextPage = () => {
  const classes = useStyles();
  const { loading, error, data, refetch } = useQuery(GET_ALL_TODOS);
  const [open, setOpen] = useState(false);

  return (
      <Container maxWidth='lg'>
        <h1>ToDo App</h1>
        <Button className={classes.createButton} color='primary' variant='contained' type='submit' onClick={() => setOpen(true) } >
            Create New
          </Button>
        <TodoCreateDialog refetch={refetch} open={open} onClose={() => setOpen(false)} />
        <ToDoTable data={data} error={error} loading={loading} refetch={refetch} />
      </Container>
  );
};

export default HomePage;
