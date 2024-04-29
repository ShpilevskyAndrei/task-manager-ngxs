export const API = 'assets/mock/data';

export enum GatewaysEnum {
  Auth = 'auth',
  User = 'user',
  Users = 'users',
  Tasks = 'tasks',
}

export const ENDPOINTS: Record<GatewaysEnum, { [key: string]: string }> = {
  [GatewaysEnum.Auth]: {
    login: 'users.json',
    logout: 'users.json',
  },
  [GatewaysEnum.User]: {
    getUserInfo: 'users.json',
  },
  [GatewaysEnum.Users]: {
    getUsers: 'users.json',
  },
  [GatewaysEnum.Tasks]: {
    getTasks: 'tasks.json',
    createTask: 'tasks.json',
    editTask: 'tasks.json',
    deleteTask: 'tasks.json',
  },
} as const;
