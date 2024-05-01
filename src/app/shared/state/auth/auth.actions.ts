import { IUserCredentials } from '../../../core/interfaces/user-credentials.interface';

export class Login {
  public static readonly type = '[Auth] Login';
  public constructor(public payload: IUserCredentials) {}
}

export class Logout {
  public static readonly type = '[Auth] Logout';
}
