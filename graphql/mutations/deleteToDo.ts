import { gql } from '@apollo/client';

const DELETE_TODO = gql`
mutation deleteToDo($id: String!) {
    deleteToDo(id: $id)
  }
`;

export default DELETE_TODO;
