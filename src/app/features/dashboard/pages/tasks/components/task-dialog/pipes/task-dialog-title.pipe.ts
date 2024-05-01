import { Pipe, PipeTransform } from '@angular/core';

import { TaskDialogType } from '../enums/task-dialog-type.enum';

@Pipe({
  name: 'taskDialogTitle',
  standalone: true,
})
export class TaskDialogTitlePipe implements PipeTransform {
  public transform(taskDialogType: TaskDialogType): string {
    switch (taskDialogType) {
      case TaskDialogType.Create:
        return 'Create a task';
      case TaskDialogType.Edit:
        return 'Edit task';
      case TaskDialogType.Read:
        return 'View a task';
    }
  }
}
