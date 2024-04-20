import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';

import { TasksService } from '../../core/services/requests/tasks.service';
import { ITask } from '../../core/interfaces/task.interface';
import { IResponse } from '../../core/interfaces/@response.interface';
import { CreateTask, DeleteTask, GetTasks } from './tasks.actions';

@State<ITask[]>({
  name: 'tasks',
  defaults: [],
})
@Injectable()
export class TasksState {
  private readonly _tasksService = inject(TasksService);

  @Action(GetTasks)
  public getTasks(ctx: StateContext<ITask[]>): Observable<GetTasks> {
    return this._tasksService.getTasks().pipe(
      tap((res: IResponse<ITask[]>): void => {
        ctx.setState(res.data!);
      }),
    );
  }

  @Action(CreateTask)
  public createTask(
    ctx: StateContext<ITask[]>,
    action: CreateTask,
  ): Observable<GetTasks> {
    const state: ITask[] = ctx.getState();

    return this._tasksService.createTask(action.task).pipe(
      tap((res: IResponse<ITask>): void => {
        ctx.patchState([...state, res.data!]);
      }),
    );
  }

  @Action(DeleteTask)
  public deleteTask(
    ctx: StateContext<ITask[]>,
    action: DeleteTask,
  ): Observable<GetTasks> {
    const state: ITask[] = ctx.getState();

    return this._tasksService.deleteTaskById(action.taskId).pipe(
      tap((): void => {
        ctx.patchState([
          ...state.filter((task: ITask): boolean => task.id !== action.taskId),
        ]);
      }),
    );
  }
}
