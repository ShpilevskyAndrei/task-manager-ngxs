import { ITask } from '../../../core/interfaces/tasks/task.interface';

export class GetTasks {
  public static readonly type = '[TASKS] Get all tasks';
}

export class CreateTask {
  public static readonly type = '[TASKS] Create task';
  public constructor(public task: Exclude<ITask, 'id' | 'date'>) {}
}

export class DuplicateTask {
  public static readonly type = '[TASKS] Duplicate task';
  public constructor(public task: Exclude<ITask, 'id' | 'date'>) {}
}

export class EditTask {
  public static readonly type = '[TASKS] Edit task';
  public constructor(public task: Exclude<ITask, 'id' | 'date'>) {}
}

export class DeleteTask {
  public static readonly type = '[TASKS] Delete task';
  public constructor(public taskId: string) {}
}
