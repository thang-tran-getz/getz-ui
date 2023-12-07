export interface IBaseResponse<T> {
    Status: number;
    Message: string;
    Data: T;
}