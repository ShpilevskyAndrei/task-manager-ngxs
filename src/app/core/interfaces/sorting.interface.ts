import { SortingDirection } from '../enums/sort-order.enum';

export interface ISorting<T> {
  key: keyof T;
  direction: SortingDirection;
}
