export enum TaskPriorityIdEnum {
  Low = '1',
  Medium = '2',
  High = '3',
}

export enum TaskPriorityNameEnum {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High',
  Unknown = 'Unknown'
}

export const taskPrioritiesList = Object.keys(TaskPriorityNameEnum).map(
  (key) => ({
    identifier: TaskPriorityIdEnum[key as keyof typeof TaskPriorityIdEnum],
    name: TaskPriorityNameEnum[key as keyof typeof TaskPriorityNameEnum],
  }),
);
