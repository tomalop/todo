import { gql } from '@apollo/client';

const GET_ALL_TODOS = gql`
{
    getAllToDos {
      id
      content
      created
      lastModified
    }
  }
`;

export default GET_ALL_TODOS;
