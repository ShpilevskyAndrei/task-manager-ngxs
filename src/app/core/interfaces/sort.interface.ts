import { SortOrder } from '../enums/sort-order.enum';

export interface ISort<T> {
  fieldName: keyof T;
  order: SortOrder;
}

export interface IPagination {
  size: number;
  page: number;
}

export interface IPageConfig<T> {
  sort?: ISort<T>;
  pagination?: IPagination;
}

export interface IPageInfo<T> {
  pagination: {
    elementsAmount: number;
    pageAmount: number;
  };
  sort: ISort<T>;
}
