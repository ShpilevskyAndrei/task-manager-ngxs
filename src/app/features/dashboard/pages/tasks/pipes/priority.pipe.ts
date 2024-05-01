import { Pipe, PipeTransform } from '@angular/core';

import {
  taskPrioritiesList,
  TaskPriorityIdEnum,
  TaskPriorityNameEnum,
} from '../enums/task-priority-id.enum';

@Pipe({
  name: 'priority',
  standalone: true,
})
export class PriorityPipe implements PipeTransform {
  public transform(value: TaskPriorityIdEnum | string): TaskPriorityNameEnum {
    const priority = taskPrioritiesList.find(
      (p) => p.identifier === value.toString(),
    );

    return priority ? priority.name : TaskPriorityNameEnum.Unknown;
  }
}
