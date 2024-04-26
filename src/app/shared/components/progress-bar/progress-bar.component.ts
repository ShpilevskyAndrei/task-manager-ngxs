import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProgressBarStateService } from '../../../core/services/progress-bar-state.service';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [MatProgressBar, NgIf],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent implements AfterViewInit {
  public loaderState?: boolean;

  private readonly _progressBarStateService = inject(ProgressBarStateService);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _destroyRef = inject(DestroyRef);

  public ngAfterViewInit(): void {
    this.trackLoaderState();
  }

  private trackLoaderState(): void {
    this._progressBarStateService
      .getSpinnerState()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((state: boolean): void => {
        this.loaderState = state;

        this._cdr.detectChanges();
      });
  }
}
