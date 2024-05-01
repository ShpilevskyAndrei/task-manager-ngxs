import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CreateTask, DeleteTask, EditTask, GetTasks } from './tasks.actions';

import { TasksService } from '../../../core/services/tasks.service';
import { ITask } from '../../../core/interfaces/tasks/task.interface';
import { IResponse } from '../../../core/interfaces/response.interface';

export interface TasksStateModel {
  data: ITask[] | null;
}

@State<TasksStateModel>({
  name: 'tasks',
  defaults: {
    data: null,
  },
})
@Injectable()
export class TasksState {
  private readonly _tasksService = inject(TasksService);

  @Selector()
  public static getTasks(state: TasksStateModel): ITask[] | null {
    return state.data;
  }

  @Action(GetTasks)
  public getTasks(
    ctx: StateContext<TasksStateModel>,
  ): Observable<IResponse<ITask[]>> {
    return this._tasksService.getTasks().pipe(
      tap((res: IResponse<ITask[]>): void => {
        ctx.setState({ data: res.data! });
      }),
    );
  }

  @Action(CreateTask)
  public createTask(
    ctx: StateContext<TasksStateModel>,
    action: CreateTask,
  ): Observable<IResponse<ITask>> {
    const state: TasksStateModel = ctx.getState();

    return this._tasksService.createTask(action.task).pipe(
      tap((res: IResponse<ITask>): void => {
        const newData: ITask[] = [res.data!];

        if (state.data && state.data.length) {
          newData.push(...state.data);
        }

        ctx.patchState({ data: newData });
      }),
    );
  }

  @Action(EditTask)
  public editTask(
    ctx: StateContext<TasksStateModel>,
    action: CreateTask,
  ): Observable<IResponse<ITask>> {
    const state: TasksStateModel = ctx.getState();

    return this._tasksService.editTask(action.task).pipe(
      tap((res: IResponse<ITask>): void => {
        ctx.patchState({
          data: state.data!.map((task: ITask) =>
            task.id === action.task.id ? { ...task, ...res.data } : task,
          ),
        });
      }),
    );
  }

  @Action(DeleteTask)
  public deleteTask(
    ctx: StateContext<TasksStateModel>,
    action: DeleteTask,
  ): Observable<GetTasks> {
    const state: TasksStateModel = ctx.getState();

    return this._tasksService.deleteTaskById(action.taskId).pipe(
      tap((): void => {
        ctx.patchState({
          data: state.data!.filter(
            (task: ITask): boolean => task.id !== action.taskId,
          ),
        });
      }),
    );
  }
}
