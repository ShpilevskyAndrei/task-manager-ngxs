import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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

import { first } from 'rxjs';

import { IResponse } from '../../core/interfaces/@response.interface';
import { AuthService } from '../../core/services/requests/auth.service';
import { ITokens } from '../../core/interfaces/tokens.interface';
import { ResponseStatusesEnum } from '../../core/enums/response-statuses.enum';

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
export class LoginComponent implements OnInit {
  public isPassVisible = false;
  public isBtnDisabled = false;

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('JohnDoe@tasksystem.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('randomPassword1', [Validators.required]),
  });

  private readonly _authService = inject(AuthService);
  private readonly _router = inject(Router);
  private readonly _snackBar = inject(MatSnackBar);

  public changePassVisibility(): void {
    this.isPassVisible = !this.isPassVisible;
  }

  public ngOnInit(): void {
    this.checkIsAuthorized();
  }

  public login(): void {
    if (this.loginForm.invalid) return;

    this.isBtnDisabled = true;

    this._authService.login(this.loginForm.getRawValue()).subscribe({
      next: (response: IResponse<ITokens>): void => {
        if (
          response.status === ResponseStatusesEnum.Error &&
          response.errorMessage
        ) {
          this._snackBar.open(response.errorMessage, 'ОК', {
            duration: 3000,
            horizontalPosition: 'end',
          });

          return;
        }

        this._router.navigate(['./dashboard']).then(() => {
          this._snackBar.open('You are successfully logged in', 'ОК', {
            duration: 3000,
            horizontalPosition: 'end',
          });
        });
      },
      complete: (): void => {
        this.isBtnDisabled = false;
      },
    });
  }

  private checkIsAuthorized(): void {
    this._authService
      .getIsAuthorized()
      .pipe(first())
      .subscribe((isAuth: boolean): void => {
        if (isAuth) {
          this._snackBar.open('You are already authorized', 'ОК', {
            duration: 3000,
            horizontalPosition: 'end',
          });

          void this._router.navigate(['/dashboard']);
        }
      });
  }
}
