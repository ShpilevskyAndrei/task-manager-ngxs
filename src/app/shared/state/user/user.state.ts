import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { DeleteUserInfo, GetUserInfo } from './user.actions';

import { IUserWithoutPass } from '../../../core/interfaces/users/user.interface';
import { UserService } from '../../../core/services/user.service';
import { IResponse } from '../../../core/interfaces/response.interface';

export interface IUserStateModel {
  data: IUserWithoutPass | null;
}

@State<IUserStateModel>({
  name: 'user',
  defaults: {
    data: null,
  },
})
@Injectable()
export class UserState {
  private readonly _usersService = inject(UserService);

  @Selector() public static getUserInfo(
    state: IUserStateModel,
  ): IUserWithoutPass | null {
    return state.data;
  }

  @Action(GetUserInfo)
  public getUserInfo(
    ctx: StateContext<IUserStateModel>,
  ): Observable<IResponse<IUserWithoutPass>> {
    return this._usersService.getUserInfo().pipe(
      tap((res: IResponse<IUserWithoutPass>): void => {
        ctx.setState({ data: res.data! });
      }),
    );
  }

  @Action(DeleteUserInfo)
  public deleteUserInfo(ctx: StateContext<IUserStateModel>): void {
    ctx.setState({ data: null });
  }
}
