import { ITask } from '../../../core/interfaces/task.interface';

export class GetTasks {
  public static readonly type = '[TASKS] Get all tasks';
}

export class CreateTask {
  public static readonly type = '[TASKS] Create task';
  public constructor(public task: ITask) {}
}

export class EditTask {
  public static readonly type = '[TASKS] Edit task';
  public constructor(public task: ITask) {}
}

export class DeleteTask {
  public static readonly type = '[TASKS] Delete task';
  public constructor(public taskId: string) {}
}
