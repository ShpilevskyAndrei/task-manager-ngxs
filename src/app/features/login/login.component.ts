import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import {
  MatButton,
  MatIconAnchor,
  MatIconButton,
} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

import { Store } from '@ngxs/store';

import { IResponse } from '../../core/interfaces/@response.interface';
import { AuthService } from '../../core/services/requests/auth.service';
import { ITokens } from '../../core/interfaces/tokens.interface';
import { ResponseStatusesEnum } from '../../core/enums/response-statuses.enum';
import { Login } from '../../shared/state/auth/auth.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSnackBarDefaultConfig } from '../../core/configs/mat-snack-bar-default.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatButton,
    MatIcon,
    MatSuffix,
    MatError,
    NgIf,
    MatIconButton,
    RouterLink,
    MatIconAnchor,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public isPassVisible = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('JohnDoe@tasksystem.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('randomPassword1', [Validators.required]),
  });

  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);

  public changePassVisibility(): void {
    this.isPassVisible = !this.isPassVisible;
  }

  public login(): void {
    if (this.loginForm.invalid) return;

    this._store
      .dispatch(new Login(this.loginForm.getRawValue()))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response: IResponse<ITokens>): void => {
          if (this.checkIsLoginError(response)) {
            this.showSnack(response.errorMessage!);

            return;
          }

          this.navToDashboard();
        },
      });
  }

  private checkIsLoginError(response: IResponse<ITokens>): boolean {
    return !!(
      response.status === ResponseStatusesEnum.Error && response.errorMessage
    );
  }

  private navToDashboard(): void {
    this._router.navigate(['./dashboard']).then((): void => {
      this.showSnack('You are successfully logged in');
    });
  }

  private showSnack(message: string): void {
    this._snackBar.open(message, 'ОК', MatSnackBarDefaultConfig);
  }
}
