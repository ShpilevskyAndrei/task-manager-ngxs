import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';

import { GetTasks } from '../../../state/tasks.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private readonly _store = inject(Store);

  public ngOnInit(): void {
    this.getTasks();
  }

  private getTasks(): void {
    this._store.dispatch(new GetTasks());
  }
}
