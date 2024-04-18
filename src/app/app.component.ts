import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { ProgressBarStateService } from './core/services/progress-bar-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatProgressBar, AsyncPipe, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly _progressBarStateService = inject(ProgressBarStateService);

  public loaderState$: Observable<boolean> =
    this._progressBarStateService.getSpinnerState();
}
