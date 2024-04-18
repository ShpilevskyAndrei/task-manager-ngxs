import { Injectable } from '@angular/core';

import { IUser } from '../../../app/core/interfaces/user.interface';
import { IResponse } from '../../../app/core/interfaces/@response.interface';
import { ResponseStatusesEnum } from '../../../app/core/enums/response-statuses.enum';

@Injectable({ providedIn: 'root' })
export class UsersControllerService {
  public getUsersControl(users: IUser[]): IResponse<IUser[]> {
    return {
      status: ResponseStatusesEnum.Success,
      data: users,
    } as IResponse<IUser[]>;
  }
}
