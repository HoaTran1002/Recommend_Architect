import { IResponse } from './interface/response.interface';

export interface IErrorResponse<T> extends IResponse<T> {
  errorMessage: string;
  errorMessageCode: string;
}
