import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Signal,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

import { SideMenuService } from '../side-menu/side-menu.service';

@Component({
  selector: 'app-subheader',
  standalone: true,
  imports: [NgClass, MatIcon, MatIconButton],
  templateUrl: './subheader.component.html',
  styleUrl: './subheader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubheaderComponent {
  public isSideMenuOpened: Signal<boolean>;

  private readonly _sideMenuService = inject(SideMenuService);

  public constructor() {
    this.isSideMenuOpened = this._sideMenuService.getIsOpen();
  }

  public switchIsMenuOpened(): void {
    this._sideMenuService.switchIsOpen();
  }
}
