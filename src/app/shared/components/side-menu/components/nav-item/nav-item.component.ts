import {
  ChangeDetectionStrategy,
  Component,
  input,
  InputSignal,
  output,
} from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

import { INav } from '../../side-menu.navs';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [NgIf, RouterLink, NgClass, MatIcon],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
  public nav: InputSignal<INav> = input.required<INav>();
  public isNavItemActive: InputSignal<boolean> = input<boolean>(false);

  public onClickEmitter = output<void>();
}
