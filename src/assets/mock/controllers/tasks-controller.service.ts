import { Injectable } from '@angular/core';

import { IResponse } from '../../../app/core/interfaces/response.interface';
import { ITask } from '../../../app/core/interfaces/tasks/task.interface';
import { ResponseStatusesEnum } from '../../../app/core/enums/response-statuses.enum';

@Injectable({ providedIn: 'root' })
export class TasksControllerService {
  public getTaskListControl(tasks: ITask[]): IResponse<ITask[]> {
    return { status: ResponseStatusesEnum.Success, data: tasks } as IResponse<
    ITask[]
    >;
  }

  public createTaskControl(task: ITask): IResponse<ITask> {
    return {
      status: ResponseStatusesEnum.Success,
      data: task,
    } as IResponse<ITask>;
  }

  public editTaskControl(task: ITask): IResponse<ITask> {
    return {
      status: ResponseStatusesEnum.Success,
      data: task,
    } as IResponse<ITask>;
  }

  public deleteTaskByIdControl(taskId: string): IResponse<boolean> {
    return {
      status: ResponseStatusesEnum.Success,
      data: !!taskId,
    } as IResponse<boolean>;
  }
}
