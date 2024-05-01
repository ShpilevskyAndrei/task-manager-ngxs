import { inject, Injectable } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Login, Logout } from './auth.actions';
import { DeleteUserInfo, GetUserInfo } from '../user/user.actions';

import { ITokens } from '../../../core/interfaces/tokens.interface';
import { AuthService } from '../../../core/services/requests/auth.service';
import { IResponse } from '../../../core/interfaces/@response.interface';

export interface AuthStateModel {
  data: ITokens | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    data: null,
  },
})
@Injectable()
export class AuthState {
  private readonly _authService = inject(AuthService);

  @Selector()
  public static accessToken(state: AuthStateModel): string | null {
    return state.data?.accessToken || null;
  }

  @Selector()
  public static refreshToken(state: AuthStateModel): string | null {
    return state.data?.refreshToken || null;
  }

  @Selector()
  public static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.data?.accessToken && !!state.data?.refreshToken;
  }

  @Action(Login)
  public login(
    ctx: StateContext<AuthStateModel>,
    action: Login,
  ): Observable<IResponse<ITokens>> {
    return this._authService.login(action.payload).pipe(
      tap((res: IResponse<ITokens>): void => {
        ctx.patchState({
          data: res.data,
        });

        ctx.dispatch(new GetUserInfo());
      }),
    );
  }

  @Action(Logout)
  public logout(
    ctx: StateContext<AuthStateModel>,
  ): Observable<IResponse<boolean>> {
    return this._authService.logout().pipe(
      tap((): void => {
        ctx.patchState({
          data: null,
        });

        ctx.dispatch(new DeleteUserInfo());
      }),
    );
  }
}
