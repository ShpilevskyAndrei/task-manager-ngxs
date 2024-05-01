import { IPaginationConfig, IPaginationInfo } from './pagination.interface';
import { ISorting } from './sorting.interface';

export interface IPageConfig<T> {
  sorting?: ISorting<T>;
  pagination?: IPaginationConfig;
}

export interface IPagesInfo<T> {
  pagination: IPaginationInfo;
  sorting: ISorting<T>;
}
