export const API = 'http://localhost:3000';

export enum GatewaysEnum {
  Auth = 'auth',
  User = 'user',
  Users = 'users',
  Tasks = 'tasks',
}

export const ENDPOINTS: Record<GatewaysEnum, { [key: string]: string }> = {
  [GatewaysEnum.Auth]: {
    login: 'users',
    logout: 'users',
  },
  [GatewaysEnum.User]: {
    getUserInfo: 'users',
  },
  [GatewaysEnum.Users]: {
    getUsers: 'users',
  },
  [GatewaysEnum.Tasks]: {
    getTasks: 'tasks',
    createTask: 'tasks',
    editTask: 'tasks',
    deleteTask: 'tasks',
  },
};
