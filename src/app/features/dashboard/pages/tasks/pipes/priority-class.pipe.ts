import { Pipe, PipeTransform } from '@angular/core';

import {
  TaskPriorityNameEnum,
} from '../enums/task-priority-id.enum';

@Pipe({
  name: 'priorityClass',
  standalone: true,
})
export class PriorityClassPipe implements PipeTransform {
  public transform(priority: TaskPriorityNameEnum): string {
    return `tasks-page__table__priority-${priority.toLowerCase()}`;
  }
}
