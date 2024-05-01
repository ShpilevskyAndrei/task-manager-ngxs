import { Component, DestroyRef, inject, input } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { NavItemComponent } from './components/nav-item/nav-item.component';
import { INav, sideMenuNavs } from './side-menu.navs';
import { IResponse } from '../../../core/interfaces/@response.interface';
import { Logout } from '../../state/auth/auth.actions';
import { ResponseStatusesEnum } from '../../../core/enums/response-statuses.enum';
import { MatSnackBarDefaultConfig } from '../../../core/configs/mat-snack-bar-default.config';

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

  private readonly _destroyRef = inject(DestroyRef);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _router = inject(Router);
  private readonly _store = inject(Store);

  public logout(): void {
    this._store
      .dispatch(new Logout())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (response: IResponse<boolean>): void => {
          if (this.checkIsLogoutError(response)) {
            this.showSnack(response.errorMessage!);

            return;
          }

          this.navigateToWelcomePage();
        },
      });
  }

  private checkIsLogoutError(response: IResponse<boolean>): boolean {
    return !!(
      response.status === ResponseStatusesEnum.Error && response.errorMessage
    );
  }

  private navigateToWelcomePage(): void {
    this._router.navigate(['/']).then((): void => {
      this.showSnack('You successfully logged out');
    });
  }

  private showSnack(message: string): void {
    this._snackBar.open(message, 'ОК', MatSnackBarDefaultConfig);
  }
}
