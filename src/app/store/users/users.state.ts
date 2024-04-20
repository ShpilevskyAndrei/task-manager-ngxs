import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, State, StateContext } from '@ngxs/store';
import { GetUsers } from './users.actions';

import { IUser } from '../../core/interfaces/user.interface';
import { UserService } from '../../core/services/requests/user.service';
import { IResponse } from '../../core/interfaces/@response.interface';

@State<IUser[]>({
  name: 'users',
  defaults: [],
})
@Injectable()
export class UsersState {
  private readonly _usersService = inject(UserService);

  @Action(GetUsers)
  public getUsers(ctx: StateContext<IUser[]>): Observable<GetUsers> {
    return this._usersService.getUserList().pipe(
      tap((res: IResponse<IUser[]>): void => {
        ctx.setState(res.data!);
      }),
    );
  }
}
