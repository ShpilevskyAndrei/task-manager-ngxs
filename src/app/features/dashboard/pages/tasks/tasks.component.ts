import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { Observable, tap } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import { ITask } from '../../../../core/interfaces/tasks/task.interface';
import { IUserWithoutPass } from '../../../../core/interfaces/users/user.interface';
import {
  DeleteTask,
  GetTasks,
} from '../../../../shared/state/tasks/tasks.actions';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TasksState } from '../../../../shared/state/tasks/tasks.state';
import { UsersState } from '../../../../shared/state/users/users.state';
import { UserInfoPipe } from '../../../../shared/pipes/user-info.pipe';
import { SubheaderComponent } from '../../../../shared/components/subheader/subheader.component';
import { TaskDialogType } from './components/task-dialog/enums/task-dialog-type.enum';
import { tasksTableColumns } from './constants/tasks-columns';
import { PriorityClassPipe } from './pipes/priority-class.pipe';
import { PriorityPipe } from "./pipes/priority.pipe";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    AsyncPipe,
    UserInfoPipe,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatTable,
    MatHeaderCellDef,
    MatCellDef,
    DatePipe,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatButton,
    MatDrawerContainer,
    MatDrawer,
    MatPaginator,
    NgStyle,
    NgClass,
    SubheaderComponent,
    PriorityClassPipe,
    MatSort,
    MatSortHeader,
    PriorityPipe,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent implements OnInit {
  @ViewChild(MatPaginator) public paginator: MatPaginator | null = null;

  @Select(UsersState.getUsers) public users$?: Observable<
  IUserWithoutPass[] | null
  >;

  public tasks$?: Observable<ITask[] | null>;

  public pageSize = this.calcPageSize();
  public dataSource!: MatTableDataSource<ITask>;
  public displayedColumns: string[] = tasksTableColumns;

  private readonly _store = inject(Store);
  private readonly _cdr = inject(ChangeDetectorRef);
  private readonly _matDialog = inject(MatDialog);

  public ngOnInit(): void {
    this.dispatchGetTasks();
    this.defineTasks();
  }

  public deleteTask(event: Event, taskId: string): void {
    event.stopPropagation();

    this._store.dispatch(new DeleteTask(taskId));
  }

  public openEditTaskDialog(event: Event, task: ITask): void {
    event.stopPropagation();

    this._matDialog.open(TaskDialogComponent, {
      data: {
        task: task,
        type: TaskDialogType.Edit,
      },
    });
  }

  public openCreateTaskDialog(): void {
    this._matDialog.open(TaskDialogComponent, {
      data: {
        task: null,
        type: TaskDialogType.Create,
      },
    });
  }

  public openTaskInfo(row: ITask): void {
    this._matDialog.open(TaskDialogComponent, {
      data: {
        task: row as ITask,
        type: TaskDialogType.Read,
      },
    });
  }

  private defineTasks(): void {
    this.tasks$ = this._store.select(TasksState.getTasks).pipe(
      tap((tasks: ITask[] | null): void => {
        if (tasks) {
          this.pageSize = Math.min(tasks.length, this.calcPageSize());
          this._cdr.detectChanges();
          this.dataSource = new MatTableDataSource(tasks);
          this.dataSource.paginator = this.paginator;
        }
      }),
    );
  }

  private dispatchGetTasks(): void {
    this._store.dispatch(new GetTasks());
  }

  private calcPageSize(): number {
    return Math.floor((window.innerHeight - 256 - 1) / 52);
  }
}
