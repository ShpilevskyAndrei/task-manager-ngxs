import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Inject,
  inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatOption, MatSelect } from '@angular/material/select';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

import { first, Observable } from 'rxjs';

import { Select, Store } from '@ngxs/store';

import {
  CreateTask,
  EditTask,
} from '../../../../../../shared/state/tasks/tasks.actions';
import { ITask } from '../../../../../../core/interfaces/tasks/task.interface';
import { TaskPriorityIdEnum } from '../../enums/task-priority-id.enum';
import { EnumToArrayPipe } from '../../../../../../shared/pipes/enum-to-array.pipe';
import { IUserWithoutPass } from '../../../../../../core/interfaces/users/user.interface';
import { UsersState } from '../../../../../../shared/state/users/users.state';
import { TaskDialogTitlePipe } from './pipes/task-dialog-title.pipe';
import { TaskDialogType } from './enums/task-dialog-type.enum';
import { FirstLetterUppercasePipe } from '../../../../../../shared/pipes/first-letter-uppercase.pipe';
import { UserState } from '../../../../../../shared/state/user/user.state';
import { PriorityPipe } from '../../pipes/priority.pipe';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogTitle,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatSelect,
    MatOption,
    EnumToArrayPipe,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatLabel,
    TaskDialogTitlePipe,
    NgIf,
    FirstLetterUppercasePipe,
    AsyncPipe,
    MatIcon,
    PriorityPipe,
  ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDialogComponent implements OnInit {
  @Select(UsersState.getUsers) public users$?: Observable<
    IUserWithoutPass[] | null
  >;

  @Select(UserState.getUserInfo)
  public user$?: Observable<IUserWithoutPass | null>;

  public taskForm!: FormGroup;

  protected readonly TaskPrioritiesEnum = TaskPriorityIdEnum;
  protected readonly TaskDialogType = TaskDialogType;

  private readonly _store = inject(Store);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _dialogRef = inject(MatDialogRef<TaskDialogComponent>);

  public constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITask; type: TaskDialogType },
  ) {}

  public ngOnInit(): void {
    this.initTaskForm();
  }

  public createTask(): void {
    if (this.taskForm.invalid) return;

    const task: Exclude<ITask, 'id'> = this.taskForm.getRawValue();

    this._store
      .dispatch(new CreateTask(task))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._dialogRef.close());
  }

  public editTask(): void {
    if (this.taskForm.invalid) return;

    const task: ITask = this.taskForm.getRawValue();

    this._store
      .dispatch(new EditTask(task))
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._dialogRef.close());
  }

  public assignToMe(): void {
    this.user$
      ?.pipe(first())
      .subscribe((userInfo: IUserWithoutPass | null): void => {
        this.taskForm.controls['userId'].setValue(userInfo!.id);
      });
  }

  private initTaskForm(): void {
    this.taskForm = new FormGroup({
      date: new FormControl(new Date(), [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      priority: new FormControl(TaskPriorityIdEnum.Medium, [
        Validators.required,
      ]),
      userId: new FormControl('', [Validators.required]),
    });

    if (this.data.type !== TaskDialogType.Create) {
      this.patchValue();
    }

    if (this.data.type === TaskDialogType.Read) {
      this.taskForm.disable();
    }
  }

  private patchValue(): void {
    this.taskForm.addControl(
      'id',
      new FormControl(this.data.task.id, Validators.required),
    );

    const task: Partial<ITask> = {
      ...this.data.task,
    } as Exclude<ITask, 'date'>;

    delete task.date;

    this.taskForm.patchValue(task);
  }
}
