
export interface Response<T> {
    status: string;
    message?: string;
    info?: object | string;
    payload?: T | object | undefined;
}

export interface ErrorResponse {
    status: string;
    errorMessage: string;
    errorSource: string;
    errorCode?: number;
}

