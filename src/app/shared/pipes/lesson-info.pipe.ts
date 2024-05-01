import { Pipe, PipeTransform } from '@angular/core';

import { ICourseConfig } from '../../core/configs/course.config';

@Pipe({
  name: 'lessonInfo',
  standalone: true,
})
export class LessonInfoPipe implements PipeTransform {
  public transform(courseConfig: ICourseConfig): string {
    return `LESSON: ${courseConfig.lesson.number}. ${courseConfig.lesson.title}`;
  }
}
