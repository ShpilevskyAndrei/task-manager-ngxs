import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

export interface ITasksState {
  tasks: [];
}

@Injectable()
@State<ITasksState>({
  name: 'tasks',
  defaults: {
    tasks: [],
  },
})
export class TasksState {}
