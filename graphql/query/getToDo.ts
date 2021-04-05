import { gql } from '@apollo/client';

const GET_TODO = gql`
query getToDo($id: String!) {
    getToDo(id: $id) {
      id
      content
      created
      lastModified
    }
  }
`;

export default GET_TODO;