import { Injectable } from '@angular/core';

import { ITokens } from '../../../app/core/interfaces/tokens.interface';
import { IUser } from '../../../app/core/interfaces/user.interface';
import { IResponse } from '../../../app/core/interfaces/@response.interface';
import { ResponseStatusesEnum } from '../../../app/core/enums/response-statuses.enum';
import { IUserCredentials } from '../../../app/core/interfaces/user-credentials.interface';

@Injectable({ providedIn: 'root' })
export class AuthControllerService {
  public loginControl(
    loginRequestBody: IUserCredentials,
    users: IUser[],
  ): IResponse<ITokens> {
    const response: IResponse<ITokens> = { status: ResponseStatusesEnum.Error };

    if (!users || !users.length) {
      response.errorMessage = 'Something went wrong. Try to reload page.';

      return response;
    }

    const user: IUser | undefined = users.find(
      (user: IUser): boolean => user.email === loginRequestBody.email,
    );

    if (!user) {
      response.errorMessage = 'There are no user with such email.';

      return response;
    }

    if (user.password !== loginRequestBody.password) {
      response.errorMessage = 'Incorrect password. Try again.';

      return response;
    }

    response.status = ResponseStatusesEnum.Success;
    response.data = {
      accessToken: loginRequestBody.email,
      refreshToken: loginRequestBody.email,
    };

    return response;
  }

  public logoutControl(): IResponse<boolean> {
    return {
      status: ResponseStatusesEnum.Success,
      data: true,
    };
  }
}
