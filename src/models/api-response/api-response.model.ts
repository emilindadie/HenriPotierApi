import { ApiError } from "../api-error/api-error.model";

export class ApiResponse<T> {
    data: T;
    error: ApiError;
    accessToken: string;
}
