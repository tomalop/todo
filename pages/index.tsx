import React from 'react';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://172.27.45.202:3',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Index = () => {
  return (
    <ApolloProvider client={client}>
      <h1>ToDo App</h1>
    </ApolloProvider>
  );
};
export default Index;
