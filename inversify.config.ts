import { Container } from 'inversify';
import IToDoResolver from './graphql/resolvers/IToDoResolver';
import { ToDoResolver } from './graphql/resolvers/ToDoResolver';
import FileService from './services/FileService';
import IFileService from './services/IFileService';

const container = new Container();
container.bind<IFileService>(FileService).to(FileService).inRequestScope();
container.bind<IToDoResolver>(ToDoResolver).to(ToDoResolver).inRequestScope();

export default container;
