import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { TasksService } from '../app/core/services/requests/tasks.service';
import { ITask } from '../app/core/interfaces/task.interface';
import { IResponse } from '../app/core/interfaces/@response.interface';

export class GetTasks {
  public static readonly type = '[TASKS] Get';
}

export class CreateTask {
  public static readonly type = '[TASKS] Create';
  public constructor(public task: ITask) {}
}

export class DeleteTask {
  public static readonly type = '[TASKS] Delete';
  public constructor(public taskId: string) {}
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

  @Action(CreateTask)
  public createTask(
    ctx: StateContext<ITasksState>,
    action: CreateTask,
  ): Observable<GetTasks> {
    const state: ITasksState = ctx.getState();

    return this._tasksService.createTask(action.task).pipe(
      tap((res: IResponse<ITask>): void => {
        ctx.setState({ ...state, tasks: [...state.tasks, res.data!] });
      }),
    );
  }

  @Action(DeleteTask)
  public deleteTask(
    ctx: StateContext<ITasksState>,
    action: DeleteTask,
  ): Observable<GetTasks> {
    const state: ITasksState = ctx.getState();

    return this._tasksService.deleteTaskById(action.taskId).pipe(
      tap((): void => {
        ctx.setState({
          ...state,
          tasks: [
            ...state.tasks.filter(
              (task: ITask): boolean => task.id !== action.taskId,
            ),
          ],
        });
      }),
    );
  }
}
