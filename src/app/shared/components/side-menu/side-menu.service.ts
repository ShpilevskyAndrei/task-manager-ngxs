import { Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  private readonly _isOpen: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(true);

  public getIsOpen(): Signal<boolean> {
    return toSignal(this._isOpen.asObservable()) as Signal<boolean>;
  }

  public switchIsOpen(): void {
    this._isOpen.next(!this._isOpen.value);
  }
}
