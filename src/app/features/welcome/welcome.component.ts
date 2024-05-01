import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';

import {
  COURSE_CONFIG_TOKEN,
  ICourseConfig,
} from '../../core/configs/course.config';
import { LessonInfoPipe } from '../../shared/pipes/lesson-info.pipe';
import { AuthState } from '../../shared/state/auth/auth.state';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    RouterLink,
    MatButton,
    MatAnchor,
    LessonInfoPipe,
    AsyncPipe,
    MatSlider,
    MatSliderThumb,
    NgForOf,
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent {
  @Select(AuthState.isAuthenticated) public isAuth$?: Observable<boolean>;

  public constructor(
    @Inject(COURSE_CONFIG_TOKEN) public courseConfig: ICourseConfig,
  ) {}
}
