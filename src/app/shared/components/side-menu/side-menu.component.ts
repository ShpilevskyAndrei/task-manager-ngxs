import { Component, DestroyRef, inject, input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NavItemComponent } from './components/nav-item/nav-item.component';
import { INav, sideMenuNavs } from './side-menu.navs';
import { AuthService } from '../../../core/services/requests/auth.service';
import { IResponse } from '../../../core/interfaces/@response.interface';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [NavItemComponent, NgIf, NgForOf, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss',
})
export class SideMenuComponent {
  public activePath = input<string | undefined>('');

  protected readonly sideMenuNavs: INav[] = sideMenuNavs;

  private readonly _authService = inject(AuthService);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);

  public logout(): void {
    this._authService
      .logout()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response: IResponse<boolean>): void => {
          if (!response.data && response.errorMessage) {
            this._snackBar.open(response.errorMessage, 'ОК', {
              duration: 3000,
              horizontalPosition: 'end',
            });
          }

          this._router.navigate(['/']).then((): void => {
            this._snackBar.open('You successfully logged in', 'ОК', {
              duration: 3000,
              horizontalPosition: 'end',
            });
          });
        },
      });
  }
}
