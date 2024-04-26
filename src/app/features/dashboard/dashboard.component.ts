import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

import { filter } from 'rxjs';

import {
  INav,
  sideMenuNavs,
} from '../../shared/components/side-menu/side-menu.navs';
import { SideMenuComponent } from '../../shared/components/side-menu/side-menu.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SideMenuService } from '../../shared/components/side-menu/side-menu.service';
import { GetUsers } from '../../store/users/users.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    RouterOutlet,
    MatDrawer,
    MatDrawerContainer,
    MatIcon,
    MatIconButton,
    RouterLink,
    MatList,
    MatListItem,
    SideMenuComponent,
    HeaderComponent,
    AsyncPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  public activeNav?: INav;

  public isSideMenuOpened: Signal<boolean>;

  private readonly _router = inject(Router);
  private readonly _destroyRef = inject(DestroyRef);
  private readonly _sideMenuService = inject(SideMenuService);
  private readonly _store = inject(Store);

  public constructor() {
    this.isSideMenuOpened = this._sideMenuService.getIsOpen();
  }

  public ngOnInit(): void {
    this.trackPaths();
    this.dispatchGetUsers();
  }

  private dispatchGetUsers(): void {
    this._store.dispatch(new GetUsers());
  }

  private trackPaths(): void {
    this.activeNav = sideMenuNavs.find(
      (nav: INav): boolean =>
        nav.path === this.extractPageFromUrl(this._router.url),
    );

    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((event): boolean => event instanceof NavigationEnd),
      )
      .subscribe((event): void => {
        if (event instanceof NavigationEnd) {
          this.activeNav = sideMenuNavs.find(
            (nav: INav): boolean =>
              nav.path === this.extractPageFromUrl(this._router.url),
          );
        }
      });
  }

  private extractPageFromUrl(url: string): string {
    const parts: string[] = url.split('/');

    return parts[parts.length - 1];
  }
}
