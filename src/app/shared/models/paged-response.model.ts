import { IHttpResponseModel } from './http-response.model';

export interface IPagedResponseModel<T> extends IHttpResponseModel<T> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
