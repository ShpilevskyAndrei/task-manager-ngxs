export interface IUser {
  id: string;
  email: string;
  avatar: string;
  displayName: string;
  password?: string;
  number: string;
  jobTitle: string;
}

export interface IUserWithoutPass extends Omit<IUser, 'password'> {}
