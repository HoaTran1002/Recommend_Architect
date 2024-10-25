import { IResponse } from './interface/response.interface';

export type Pagination = {
  maxPerPage: number;
  pageNumber: number;
  totalItem: number;
  totalPage: number;
};
export interface ISuccessResponse<T> extends IResponse<T> {
  success: boolean;
  data: T;
}

export class ISuccessResponsePaginate<T> implements IResponse<T> {
  success: boolean;
  data: T;
  paging: Pagination;
}
