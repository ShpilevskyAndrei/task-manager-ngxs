import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Observable, of, switchMap } from 'rxjs';

import { Store } from '@ngxs/store';

import {
  IUser,
  IUserWithoutPass,
} from '../../../app/core/interfaces/users/user.interface';
import { IResponse } from '../../../app/core/interfaces/response.interface';
import { ResponseStatusesEnum } from '../../../app/core/enums/response-statuses.enum';
import { AuthState } from '../../../app/shared/state/auth/auth.state';

@Injectable({ providedIn: 'root' })
export class UsersControllerService {
  public readonly _store = inject(Store);
  public readonly _destroyRef = inject(DestroyRef);

  public getUserInfoControl(
    users: IUser[],
  ): Observable<IResponse<IUserWithoutPass>> {
    return this._store.select(AuthState.accessToken).pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap((token) => {
        const user: IUser | undefined = users.find(
          (user: IUser): boolean => user.email === token,
        );

        delete user?.password;

        return of({
          status: ResponseStatusesEnum.Success,
          data: user,
        } as IResponse<IUserWithoutPass>);
      }),
    );
  }

  public getUsersControl(users: IUser[]): IResponse<IUserWithoutPass[]> {
    users.forEach((user: IUser): void => {
      delete user.password;
    });

    return {
      status: ResponseStatusesEnum.Success,
      data: users,
    } as IResponse<IUserWithoutPass[]>;
  }

  public createUserControl(user: IUser): IResponse<IUser> {
    return {
      status: ResponseStatusesEnum.Success,
      data: user,
    } as IResponse<IUser>;
  }

  public editUserControl(user: IUser): IResponse<IUser> {
    return {
      status: ResponseStatusesEnum.Success,
      data: user,
    } as IResponse<IUser>;
  }

  public deleteUserByIdControl(userId: string): IResponse<boolean> {
    return {
      status: ResponseStatusesEnum.Success,
      data: !!userId,
    } as IResponse<boolean>;
  }
}
