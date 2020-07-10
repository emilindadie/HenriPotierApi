import { ApiError } from "../api-error/api-error.model";

export class MyApiResponse<T> {
    data: T;
    error: ApiError;
    accessToken: string;
}
