import { State, Action, StateContext, Selector } from '@ngxs/store';
import { TodoStateInterface } from '../models/todo-state.model';
import { AddTodo, GetTodos, RemoveTodo } from './actions/todo.actions';
import { TodoService } from '../services/todo.service';
import { catchError, of, switchMap, tap } from 'rxjs';
import { TodoInterface } from '../models/todo.model';
import { Injectable } from '@angular/core';

@Injectable()
@State<TodoStateInterface>({
  name: 'todo',
  defaults: {
    todos: [],
  },
})
export class TodoState {
  constructor(private todoService: TodoService) {}

  @Selector()
  static todos(state: TodoStateInterface) {
    return state.todos;
  }

  @Action(GetTodos, { cancelUncompleted: true })
  getTodos({ getState, patchState }: StateContext<TodoStateInterface>) {
    const state = getState();

    return this.todoService.getTodos().pipe(
      tap((todos: TodoInterface[]) => {
        patchState({
          todos: [...todos],
        });
      }),
    );
  }

  @Action(AddTodo)
  add(
    { dispatch, getState, patchState }: StateContext<TodoStateInterface>,
    { payload }: AddTodo,
  ) {
    return this.todoService.addTodo(payload).pipe(
      tap((status: number) => {
        dispatch(new GetTodos());
      }),
      catchError(() => {
        alert('Failed to add task');
        return of();
      }),
    );
  }

  @Action(RemoveTodo)
  remove(
    { dispatch, getState, patchState }: StateContext<TodoStateInterface>,
    { id }: RemoveTodo,
  ) {
    return this.todoService.removeTodo(id).pipe(
      tap((status: number) => {
        dispatch(new GetTodos());
      }),
      catchError(() => {
        alert('Failed to remove task');
        return of();
      }),
    );
  }
}
