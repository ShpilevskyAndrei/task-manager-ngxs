import { Injectable } from '@angular/core';

import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarStateService {
  private _spinnerState$: BehaviorSubject<number> = new BehaviorSubject<number>(
    0,
  );

  public getSpinnerState(): Observable<boolean> {
    return this._spinnerState$.asObservable().pipe(map((v) => !!v));
  }

  public setSpinnerState(value: number): void {
    return this._spinnerState$.next(value);
  }

  public showSpinner(): void {
    this.setSpinnerState(this._spinnerState$.value + 1);
  }

  public hideSpinner(): void {
    this.setSpinnerState(Math.max(0, this._spinnerState$.value - 1));
  }

  public destroySpinner(): void {
    this.setSpinnerState(0);
  }
}
