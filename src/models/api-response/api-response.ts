import { ApiError } from "../api-error/api-error";

export class ApiResponse<T> {
    data: T;
    error: ApiError;
}
