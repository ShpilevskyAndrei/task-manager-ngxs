import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { RequestService } from './@request.service';
import { API, ENDPOINTS } from '../../constants/endpoints';
import { IResponse } from '../../interfaces/@response.interface';
import { ITask } from '../../interfaces/task.interface';
import { TasksControllerService } from '../../../../assets/mock/controllers/tasks-controller.service';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly _httpService = inject(RequestService);
  private readonly _tasksController = inject(TasksControllerService);

  public getTasks(): Observable<IResponse<ITask[]>> {
    return this._httpService
      .get<ITask[]>(API, ENDPOINTS.tasks['getTasks'])
      .pipe(
        map((tasks: ITask[]): IResponse<ITask[]> => {
          return this._tasksController.getTaskListControl(tasks);
        }),
      );
  }

  public createTask(task: ITask): Observable<IResponse<ITask>> {
    return this._httpService
      .post<ITask, ITask[]>(API, ENDPOINTS.tasks['createTask'], task)
      .pipe(
        map((): IResponse<ITask> => {
          return this._tasksController.createTaskControl(task);
        }),
      );
  }

  public editTask(task: ITask): Observable<IResponse<ITask>> {
    return this._httpService
      .post<ITask, ITask[]>(API, ENDPOINTS.tasks['editTask'], task)
      .pipe(
        map((): IResponse<ITask> => {
          return this._tasksController.editTaskControl(task);
        }),
      );
  }

  public deleteTaskById(taskId: string): Observable<IResponse<boolean>> {
    return this._httpService
      .delete<ITask[]>(API, ENDPOINTS.tasks['deleteTask'])
      .pipe(
        map((): IResponse<boolean> => {
          return this._tasksController.deleteTaskByIdControl(taskId);
        }),
      );
  }
}
