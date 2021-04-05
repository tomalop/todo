import { Arg, ArgsType, InputType, Mutation, Query, Resolver } from 'type-graphql';
import ToDo from '../../models/ToDo';
import FileService from '../../services/FileService';
import IFileService from '../../services/IFileService';
import { UpdateTodoInput } from '../Inputs/UpdateToDoInput';
import { v4 as uuidv4 } from 'uuid';
import { inject, injectable } from 'inversify';
import IToDoResolver from './IToDoResolver';

// ? Je vlastně možné, aby fs fungoval asynchronně a tím pádem udělat async akce?
// Todo Refakotorovat

@injectable()
@Resolver(ToDo)
export class ToDoResolver implements IToDoResolver {
  private fileService: IFileService;

  constructor(@inject(FileService) fileService: IFileService) {
    this.fileService = fileService;
  }

  @Query(() => ToDo)
  getToDo(@Arg('id') id: string) {
    const file = this.fileService.read();
    const todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    const todo = todos.find((t) => t.id === id);
    // if (!todo) return undefined;
    if (todo === undefined) throw new Error(`Get operation failed. Object with id: ${id} was not found`);
    return todo;
  }

  @Query(() => [ToDo])
  getAllToDos() {
    const file = this.fileService.read();
    const todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    // if (todos.length === 0) throw new Error(`GetAll operation failed. No object found.`);
    return todos;
  }

  @Mutation(() => ToDo)
  createToDo(@Arg('content', { nullable: true, defaultValue: '' }) content: string) {
    const file = this.fileService.read();
    const todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    todos.unshift({ id: uuidv4(), content, created: new Date(), lastModified: new Date() });
    this.fileService.write(JSON.stringify(todos));
    return todos[0];
  }

  @Mutation(() => ToDo)
  updateToDo(@Arg('updateTodoInput') newToDoData: UpdateTodoInput) {
    const file = this.fileService.read();
    let todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    const index = todos.findIndex((t) => t.id === newToDoData.id);
    if (index === -1) throw new Error(`Update operation failed. Object with id: ${newToDoData.id} was not found`);
    todos[index].content = newToDoData.content;
    todos[index].lastModified = new Date();
    this.fileService.write(JSON.stringify(todos));
    return todos[index];
  }

  @Mutation(() => String)
  deleteToDo(@Arg('id') id: string) {
    const file = this.fileService.read();
    let todos: ToDo[] = JSON.parse(file, this.dateTimeReviver);
    todos = todos.filter((t) => t.id !== id);
    // const index = todos.findIndex(t => t.id === id);
    // if(index === -1) throw new Error(`Delete operation failed. Object with id: ${id} was not found`);
    // todos.splice(index);
    this.fileService.write(JSON.stringify(todos));
    return id;
  }

  private dateTimeReviver(key: any, value: any) {
    if (key === 'lastModified' || key === 'created') return new Date(value);
    return value;
  }
}
