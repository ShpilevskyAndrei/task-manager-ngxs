import { Injectable } from '@angular/core';

import { IResponse } from '../../../app/core/interfaces/@response.interface';
import { ITask } from '../../../app/core/interfaces/task.interface';
import { ResponseStatusesEnum } from '../../../app/core/enums/response-statuses.enum';

@Injectable({ providedIn: 'root' })
export class TasksControllerService {
  public getTaskListControl(tasks: ITask[]): IResponse<ITask[]> {
    return { status: ResponseStatusesEnum.Success, data: tasks } as IResponse<
      ITask[]
    >;
  }

  public createTaskControl(task: ITask): IResponse<ITask> {
    task.id = Math.floor(Math.random() * 1000000).toString();
    task.date = new Date();

    return {
      status: ResponseStatusesEnum.Success,
      data: task,
    } as IResponse<ITask>;
  }

  public deleteTaskByIdControl(): IResponse<boolean> {
    return {
      status: ResponseStatusesEnum.Success,
      data: true,
    } as IResponse<boolean>;
  }
}
