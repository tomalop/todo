import { inject, injectable } from 'inversify';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { v4 as uuidv4 } from 'uuid';
import ToDo from '../../models/ToDo';
import FileService from '../../services/FileService';
import IFileService from '../../services/IFileService';
import { UpdateTodoInput } from '../Inputs/UpdateToDoInput';
import IToDoResolver from './IToDoResolver';

// ? Is it possible for async to work asynchronously (without lock-blockation, with single file), so we can make async actions?

@injectable()
@Resolver(ToDo)
export class ToDoResolver implements IToDoResolver {
  private fileService: IFileService;

  constructor(@inject(FileService) fileService: IFileService) {
    this.fileService = fileService;
  }

  private readParseFile() {
    const file = this.fileService.read();
    const todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    return todos;
  }

  @Query(() => ToDo)
  getToDo(@Arg('id') id: string) {
    const todos: ToDo[] = this.readParseFile();
    const todo = todos.find((t) => t.id === id);
    if (todo === undefined) throw new Error(`Get operation failed. Object with id: ${id} was not found`);
    return todo;
  }

  @Query(() => [ToDo])
  getAllToDos() {
    const todos: ToDo[] = this.readParseFile();
    return todos;
  }

  @Mutation(() => ToDo)
  createToDo(@Arg('content', { nullable: true, defaultValue: '' }) content: string) {
    const todos: ToDo[] = this.readParseFile();
    todos.unshift({ id: uuidv4(), content, created: new Date(), lastModified: new Date() });
    this.fileService.write(JSON.stringify(todos));
    return todos[0];
  }

  @Mutation(() => ToDo)
  updateToDo(@Arg('updateTodoInput') newToDoData: UpdateTodoInput) {
    const todos: ToDo[] = this.readParseFile();
    const index = todos.findIndex((t) => t.id === newToDoData.id);
    if (index === -1) throw new Error(`Update operation failed. Object with id: ${newToDoData.id} was not found`);
    todos[index].content = newToDoData.content;
    todos[index].lastModified = new Date();
    this.fileService.write(JSON.stringify(todos));
    return todos[index];
  }

  @Mutation(() => String)
  deleteToDo(@Arg('id') id: string) {
    let todos: ToDo[] = this.readParseFile();
    todos = todos.filter((t) => t.id !== id);
    this.fileService.write(JSON.stringify(todos));
    return id;
  }

  private dateTimeReviver(key: any, value: any) {
    if (key === 'lastModified' || key === 'created') return new Date(value);
    return value;
  }
}
