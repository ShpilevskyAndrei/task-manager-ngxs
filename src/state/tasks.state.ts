import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { TasksService } from '../app/core/services/requests/tasks.service';
import { ITask } from '../app/core/interfaces/task.interface';
import { IResponse } from '../app/core/interfaces/@response.interface';

export class GetTasks {
  public static readonly type = '[TASKS] Get';
}

export interface ITasksState {
  tasks: ITask[];
}

@Injectable()
@State<ITasksState>({
  name: 'tasks',
  defaults: {
    tasks: [],
  },
})
export class TasksState {
  private readonly _tasksService = inject(TasksService);

  @Action(GetTasks)
  public getTasks(ctx: StateContext<ITasksState>): Observable<GetTasks> {
    return this._tasksService.getTasks().pipe(
      tap((res: IResponse<ITask[]>): void => {
        ctx.setState({ tasks: res.data! });
      }),
    );
  }
}
