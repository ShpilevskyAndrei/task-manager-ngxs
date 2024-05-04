import { Component, DestroyRef, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Store } from '@ngxs/store';

import { ITask } from '../../../../../../core/interfaces/tasks/task.interface';
import { DeleteTask } from '../../../../../../shared/state/tasks/tasks.actions';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    NgIf,
    MatDialogActions,
  ],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss',
})
export class DeleteDialogComponent {
  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dialogRef = inject(MatDialogRef<DeleteDialogComponent>);

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: ITask,
  ) {}

  public deleteTask(taskId: string): void {
    this._store
      .dispatch(new DeleteTask(taskId))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._dialogRef.close());
  }
}
