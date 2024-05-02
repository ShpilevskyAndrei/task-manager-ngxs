import { inject, Injectable } from '@angular/core';

import { map, Observable, switchMap } from 'rxjs';

import { RequestService } from './@request.service';
import { IUser, IUserWithoutPass } from '../interfaces/users/user.interface';
import { API, ENDPOINTS } from '../constants/endpoints';
import { IResponse } from '../interfaces/response.interface';
import { UsersControllerService } from '../../../assets/mock/controllers/users-controller.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _httpService = inject(RequestService);
  private readonly _userHelper = inject(UsersControllerService);

  public getUserInfo(): Observable<IResponse<IUserWithoutPass>> {
    return this._httpService
      .get<IUser[]>(API, ENDPOINTS.user['getUserInfo'])
      .pipe(
        switchMap((users: IUser[]) => {
          return this._userHelper.getUserInfoControl(users);
        }),
      );
  }

  public getUserList(): Observable<IResponse<IUserWithoutPass[]>> {
    return this._httpService
      .get<IUser[]>(API, ENDPOINTS.users['getUsers'])
      .pipe(
        map((users: IUser[]): IResponse<IUserWithoutPass[]> => {
          return this._userHelper.getUsersControl(users);
        }),
      );
  }

  public createUser(user: Exclude<IUser, 'id'>): Observable<IResponse<IUser>> {
    return this._httpService
      .post<IUser>(API, ENDPOINTS.users['createUser'], user)
      .pipe(
        map((createdUser: IUser): IResponse<IUser> => {
          return this._userHelper.createUserControl(createdUser);
        }),
      );
  }

  public editUser(user: IUser): Observable<IResponse<IUser>> {
    return this._httpService
      .patch<IUser>(API, ENDPOINTS.users['editUser'], user, user.id)
      .pipe(
        map((): IResponse<IUser> => {
          return this._userHelper.editUserControl(user);
        }),
      );
  }

  public deleteUserById(userId: string): Observable<IResponse<boolean>> {
    return this._httpService
      .delete<IUser>(API, ENDPOINTS.users['deleteUser'], userId)
      .pipe(
        map((): IResponse<boolean> => {
          return this._userHelper.deleteUserByIdControl(userId);
        }),
      );
  }
}
