import { gql } from '@apollo/client';

const UPDATE_TODO = gql`
mutation updateToDo($updateTodoInput: UpdateTodoInput!) {
    updateToDo(updateTodoInput: $updateTodoInput) {
      id
    }
  }
`;

export default UPDATE_TODO;
