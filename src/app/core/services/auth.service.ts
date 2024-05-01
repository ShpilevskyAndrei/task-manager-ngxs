import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { RequestService } from './@request.service';
import { IUser } from '../interfaces/users/user.interface';
import { ITokens } from '../interfaces/auth/tokens.interface';
import { IUserCredentials } from '../interfaces/auth/user-credentials.interface';
import { API, ENDPOINTS } from '../constants/endpoints';
import { AuthControllerService } from '../../../assets/mock/controllers/auth-controller.service';
import { IResponse } from '../interfaces/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _httpService = inject(RequestService);
  private readonly _authServiceHelper = inject(AuthControllerService);

  public login(
    loginRequestBody: IUserCredentials,
  ): Observable<IResponse<ITokens>> {
    return this._httpService.get<IUser[]>(API, ENDPOINTS.auth['login']).pipe(
      map((users: IUser[]): IResponse<ITokens> => {
        return this._authServiceHelper.loginControl(loginRequestBody, users);
      }),
    );
  }

  public logout(): Observable<IResponse<boolean>> {
    return this._httpService.get<boolean>(API, ENDPOINTS.auth['logout']).pipe(
      map((): IResponse<boolean> => {
        return this._authServiceHelper.logoutControl();
      }),
    );
  }
}
