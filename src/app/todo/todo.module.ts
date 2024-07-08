import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { NgxsModule } from '@ngxs/store';
import { TodoState } from './store/todo.state';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TodoItemComponent, TodoListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TodoListComponent,
      },
    ]),
    NgxsModule.forFeature([TodoState]),
    FormsModule,
  ],
})
export class TodoModule {}
