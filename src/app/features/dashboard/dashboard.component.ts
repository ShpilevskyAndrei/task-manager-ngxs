import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { GetUsers } from '../../store/users/users.actions';
import {
  CreateTask,
  DeleteTask,
  GetTasks,
} from '../../store/tasks/tasks.actions';

import { ITask } from '../../core/interfaces/task.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly _store = inject(Store);

  public ngOnInit(): void {
    this._store.dispatch(new GetTasks());
    this._store.dispatch(new GetUsers());

    // this._store.dispatch([new GetTasks(), new GetUsers()]);
  }

  private createTask(newTask: ITask): void {
    this._store.dispatch(new CreateTask(newTask));
  }

  private deleteTask(taskId: string): void {
    this._store.dispatch(new DeleteTask(taskId));
  }
}
