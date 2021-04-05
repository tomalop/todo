import { gql } from '@apollo/client';

const CREATE_TODO = gql`
mutation createToDo($content: String) {
    createToDo(content: $content) {
      content
    }
  }
`;

export default CREATE_TODO;
