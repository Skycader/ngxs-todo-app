import { Component, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AddTodo, GetTodos } from '../../store/actions/todo.actions';
import { Observable, of } from 'rxjs';
import { TodoInterface } from '../../models/todo.model';
import { TodoState } from '../../store/todo.state';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  // @Select(TodoState.todos) todos$!: Observable<TodoInterface>;
  public todos$ = this.store.select(TodoState.todos);
  constructor(private store: Store) {}
  ngOnInit() {
    this.store.dispatch(new GetTodos());
  }

  addTodo() {
    this.store.dispatch(new AddTodo({ title: '', done: 0, id: Date.now() }));
  }
}
