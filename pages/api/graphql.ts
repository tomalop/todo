import { ApolloServer } from 'apollo-server-micro';
import { NextApiRequest, NextApiResponse } from 'next';
import { buildSchema } from 'type-graphql';
import { ToDoResolver } from './../../graphql/resolvers/ToDoResolver';
import 'reflect-metadata';
import container from "./../../inversify.config";


let apolloServerHandler: (req: any, res: any) => Promise<void>;

const getApolloServerHandler = async () => {
  if (!apolloServerHandler) {
    const schema = await buildSchema({
      resolvers: [ToDoResolver],
      container
    });
    apolloServerHandler = new ApolloServer({ schema }).createHandler({ path: '/api/graphql' });
  }
  return apolloServerHandler;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const apolloServerHandler = await getApolloServerHandler();
  return apolloServerHandler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};
