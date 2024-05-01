import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable } from 'rxjs';

import { Select } from '@ngxs/store';
import { UserState } from '../../../../shared/state/user/user.state';

import { SubheaderComponent } from '../../../../shared/components/subheader/subheader.component';
import { IUserWithoutPass } from '../../../../core/interfaces/users/user.interface';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    MatButton,
    SubheaderComponent,
    AsyncPipe,
    MatIcon,
    MatIconButton,
    MatTooltip,
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent {
  @Select(UserState.getUserInfo)
  public userInfo$?: Observable<IUserWithoutPass | null>;

  private readonly _snackBar = inject(MatSnackBar);

  public copyToClipboard(data: string): void {
    navigator.clipboard.writeText(data).then((): void => {
      this._snackBar.open('Copied', 'ОК', {
        duration: 500,
        horizontalPosition: 'end',
      });
    });
  }
}
