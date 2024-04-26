import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '../../core/interfaces/user.interface';

@Pipe({
  name: 'userInfo',
  standalone: true,
})
export class UserInfoPipe implements PipeTransform {
  public transform(userId: string, users: IUser[] | undefined): IUser | null {
    if (!users) return null;

    return users.find((user: IUser): boolean => user.id === userId) || null;
  }
}
