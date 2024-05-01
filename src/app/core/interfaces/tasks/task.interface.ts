import { TaskPriorityIdEnum } from '../../../features/dashboard/pages/tasks/enums/task-priority-id.enum';

export interface ITask {
  id: string;
  date: Date;
  title: string;
  description?: string;
  priority: TaskPriorityIdEnum;
  userId: string;
}
