import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetUsers } from './users.actions';

import { IUserWithoutPass } from '../../../core/interfaces/users/user.interface';
import { UserService } from '../../../core/services/user.service';
import { IResponse } from '../../../core/interfaces/response.interface';

export interface UsersStateModel {
  data: IUserWithoutPass[] | null;
}

@State<UsersStateModel>({
  name: 'users',
  defaults: {
    data: null,
  },
})
@Injectable()
export class UsersState {
  private readonly _usersService = inject(UserService);

  @Selector()
  public static getUsers(state: UsersStateModel): IUserWithoutPass[] | null {
    return state.data;
  }

  @Action(GetUsers)
  public getUsers(
    ctx: StateContext<UsersStateModel>,
  ): Observable<IResponse<IUserWithoutPass[]>> {
    return this._usersService.getUserList().pipe(
      tap((res: IResponse<IUserWithoutPass[]>): void => {
        ctx.setState({ data: res.data! });
      }),
    );
  }
}
