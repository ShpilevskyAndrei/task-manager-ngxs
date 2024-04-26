import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
  OnInit,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatAnchor, MatButton, MatIconButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import {AsyncPipe, NgForOf} from '@angular/common';
import { MatSlider, MatSliderThumb } from '@angular/material/slider';

import { Observable, of } from 'rxjs';

import {
  COURSE_CONFIG_TOKEN,
  ICourseConfig,
} from '../../core/configs/course.config';
import { LessonInfoPipe } from '../../shared/pipes/lesson-info.pipe';
import { AuthService } from '../../core/services/requests/auth.service';

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
export class WelcomeComponent implements OnInit {
  public isAuth$: Observable<boolean> = of(false);

  private readonly _authService = inject(AuthService);

  public constructor(
    @Inject(COURSE_CONFIG_TOKEN) public courseConfig: ICourseConfig,
  ) {}

  public ngOnInit(): void {
    this.isAuth$ = this._authService.getIsAuthorized();
  }
}
