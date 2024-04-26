import { Pipe, PipeTransform } from '@angular/core';

import { TaskPrioritiesEnum } from '../../../../../core/enums/task-priorities.enum';

@Pipe({
  name: 'priorityClass',
  standalone: true,
})
export class PriorityClassPipe implements PipeTransform {
  public transform(priority: TaskPrioritiesEnum): string {
    return `tasks-page__table__priority-${priority.toLowerCase()}`;
  }
}
