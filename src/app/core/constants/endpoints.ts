export const API = 'assets/mock';

export enum GatewaysEnum {
  Users = 'users',
  Tasks = 'tasks',
}

export const ENDPOINTS: Record<GatewaysEnum, { [key: string]: string }> = {
  users: {
    getUsers: 'users.json',
  },
  tasks: {
    getTasks: 'tasks.json',
    createTask: 'tasks.json',
    deleteTask: 'tasks.json',
  },
} as const;
