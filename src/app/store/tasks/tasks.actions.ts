import { ITask } from '../../core/interfaces/task.interface';

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
