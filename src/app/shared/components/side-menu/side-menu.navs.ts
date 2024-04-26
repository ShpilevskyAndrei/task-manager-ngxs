export interface INav {
  title: string;
  path?: string;
  icon: string;
  type?: 'main' | 'additional';
}

export const sideMenuNavs: INav[] = [
  {
    title: 'Tasks',
    path: 'tasks',
    icon: 'check_circle_outline',
    type: 'main',
  },
  {
    title: 'Users',
    path: 'users',
    icon: 'people',
    type: 'main',
  },
  {
    title: 'Log out',
    icon: 'logout',
    type: 'additional',
  },
];
