import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { NgForOf } from '@angular/common';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';

import {
  COURSE_CONFIG_TOKEN,
  ICourseConfig,
} from '../../../core/configs/course.config';
import { LessonInfoPipe } from '../../pipes/lesson-info.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatIcon,
    MatIconButton,
    RouterLink,
    LessonInfoPipe,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    NgForOf,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public constructor(
    @Inject(COURSE_CONFIG_TOKEN) public courseConfig: ICourseConfig,
  ) {}
}
