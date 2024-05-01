import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, delay, Observable, throwError } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ProgressBarService } from '../../shared/components/progress-bar/progress-bar.service';

export const progressBarInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const progressBarService = inject(ProgressBarService);

  progressBarService.showSpinner();

  return next(req).pipe(
    delay(Math.floor(Math.random() * 1500) + 1), // response delay imitation
    catchError((error) => {
      progressBarService.hideSpinner();

      return throwError(() => error);
    }),
    finalize((): void => {
      progressBarService.hideSpinner();
    }),
  );
};
