import ToDo from '../../models/ToDo';
import { UpdateTodoInput } from '../Inputs/UpdateToDoInput';

export default interface IToDoResolver {
  getToDo: (id: string) => ToDo;
  getAllToDos: () => ToDo[];
  createToDo: (content: string) => ToDo;
  updateToDo: (newToDoData: UpdateTodoInput) => ToDo;
  deleteToDo: (id: string) => string;
}
