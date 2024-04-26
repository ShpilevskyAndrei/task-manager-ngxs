import { InjectionToken, Provider } from '@angular/core';

export interface ICourseConfig {
  info: ICourseInfo;
  lesson: ILesson;
  environment: LessonCodeType;
  techLinks: ITechLink[];
}

export interface ITechLink {
  name: string;
  url: string;
}

export interface ICourseInfo {
  fullName: string;
  shortName: string;
  logo: string;
}

export interface ILesson {
  number?: string;
  title: string;
  workspaceCode?: string;
  solutionCommit?: string;
}

export enum LessonCodeType {
  Workspace = 'workspace',
  Solution = 'solution',
}

const techLinks: ITechLink[] = [
  {
    name: 'Documentation',
    url: 'https://www.ngxs.io',
  },
  {
    name: 'NPM package',
    url: 'https://www.npmjs.com/package/@ngxs/store',
  },
  {
    name: 'GitHub (source)',
    url: 'https://github.com/ngxs',
  },
];

const courseInfo: ICourseInfo = {
  fullName: 'Deep dive into NGXS with Angular 17',
  shortName: 'NGXS course',
  logo: 'assets/images/ngxs.png',
};

const lessons: Record<number, Record<number, ILesson>> = {
  1: {
    1: {
      number: '1.1',
      title: 'What is a State Manager and Why is it Needed?',
    },
    2: {
      number: '1.2',
      title: 'Why NGXS?',
    },
    3: {
      number: '1.3',
      title: 'Fundamental Principles and Concepts of NGXS',
    },
  },
  2: {
    1: {
      number: '2.1',
      title: 'Installation NGXS',
      workspaceCode: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
      solutionCommit: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
    },
    2: {
      number: '2.2',
      title: 'Creating Your First Actions',
      workspaceCode: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
      solutionCommit: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
    },
    3: {
      number: '2.3',
      title: 'Basics of Working with Selectors and State Operators',
      workspaceCode: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
      solutionCommit: 'https://github.com/ShpilevskyAndrei/task-manager-ngxs',
    },
  },
};

export const COURSE_CONFIG_TOKEN: InjectionToken<ICourseConfig> =
  new InjectionToken<ICourseConfig>('LESSON_TOKEN');

export function provideCourseConfig(): Provider {
  return {
    provide: COURSE_CONFIG_TOKEN,
    useValue: {
      info: courseInfo,
      lesson: lessons[2][2],
      environment: LessonCodeType.Workspace,
      techLinks: techLinks,
    },
  };
}
