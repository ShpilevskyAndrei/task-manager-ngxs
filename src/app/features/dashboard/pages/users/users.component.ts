import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';

import { SubheaderComponent } from '../../../../shared/components/subheader/subheader.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatButton, SubheaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  public openCreateUserDialog(): void {
    //TODO. Make Logic
  }
}
