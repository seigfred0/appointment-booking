
export class CustomError extends Error {
    errorCode: number;
    constructor(message: string, errorCode: number = 500) {
        super(message);
        this.name = "CustomError";
        this.errorCode = errorCode;
    }
}