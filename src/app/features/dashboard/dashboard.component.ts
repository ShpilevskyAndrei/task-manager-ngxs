import { Component, inject, OnInit } from '@angular/core';

import { asapScheduler } from 'rxjs';

import { Store } from '@ngxs/store';

import { CreateTask, DeleteTask, GetTasks } from '../../../state/tasks.state';
import { ITask } from '../../core/interfaces/task.interface';
import { TaskPrioritiesEnum } from '../../core/enums/task-priorities.enum';

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
    this.getTasks();
    this.createTask();
    this.deleteTask();
  }

  private getTasks(): void {
    this._store.dispatch(new GetTasks());
  }

  private createTask(): void {
    const newTask: ITask = {
      title: 'Create new action',
      userId: '1',
      description: 'New action must be able to create tasks',
      priority: TaskPrioritiesEnum.High,
    };

    asapScheduler.schedule((): void => {
      this._store.dispatch(new CreateTask(newTask));
    }, 2000);
  }

  private deleteTask(): void {
    const taskId = '1';

    asapScheduler.schedule((): void => {
      this._store.dispatch(new DeleteTask(taskId));
    }, 4000);
  }
}
