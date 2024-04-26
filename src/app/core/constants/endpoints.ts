export const API = 'assets/mock/data';

export enum GatewaysEnum {
  Users = 'users',
  Tasks = 'tasks',
  Auth = 'auth',
}

export const ENDPOINTS: Record<GatewaysEnum, { [key: string]: string }> = {
  [GatewaysEnum.Auth]: {
    login: 'users.json',
    logout: 'users.json',
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
