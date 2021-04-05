import { Button, Container, Grid, TextField } from '@material-ui/core';
import { NextPage } from 'next/types';
import React from 'react';
import ToDoTable from '../components/todoTable';
import { useQuery } from "@apollo/client";
import GET_ALL_TODOS from "./../graphql/query/getAllToDos";

const HomePage: NextPage = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_TODOS);
  return (
      <Container maxWidth='lg'>
        <h1>ToDo App</h1>
        <Grid>
            <TextField autoComplete='off' id='standard-basic' name='todo-text' label='Your text...' />
        </Grid>
        <Grid >
          <Button color='primary' variant='contained' type='submit' disabled={true} >
            Submit
          </Button>
        </Grid>
        <ToDoTable data={data} error={error} loading={loading} refetch={refetch} />
      </Container>
  );
};

export default HomePage;
