import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { RequestService } from './@request.service';
import { IUser } from '../../interfaces/user.interface';
import { API, ENDPOINTS } from '../../constants/endpoints';
import { IResponse } from '../../interfaces/@response.interface';
import { UsersControllerService } from '../../../../assets/mock/controllers/users-controller.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpService = inject(RequestService);
  private readonly _userHelper = inject(UsersControllerService);

  public getUserList(): Observable<IResponse<IUser[]>> {
    return this._httpService
      .get<IUser[]>(API, ENDPOINTS.users['getUsers'])
      .pipe(
        map((users: IUser[]): IResponse<IUser[]> => {
          return this._userHelper.getUsersControl(users);
        }),
      );
  }
}
