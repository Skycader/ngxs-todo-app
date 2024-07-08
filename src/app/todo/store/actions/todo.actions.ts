import { TodoInterface } from '../../models/todo.model';

export class GetTodos {
  static readonly type = '[Todo] Get todos';

  constructor() {}
}

export class AddTodo {
  static readonly type = '[Todo] Add todo';

  constructor(public payload: TodoInterface) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove todo';

  constructor(public id: number) {}
}

export class ToggleTodo {
  static readonly type = '[Todo] Toggle todo';

  constructor(public payload: { id: number; done: number }) {}
}
