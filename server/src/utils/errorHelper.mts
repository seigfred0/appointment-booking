import { CustomError } from "./customError.mjs";

export function getErrorMessage(error: unknown) {
    if (error instanceof Error) return error.message;
    return String(error);
}

export function getErrorCode(error: unknown) {
    return error instanceof CustomError ? error.errorCode : 500; 
}

/*
If the error is an instance of the built-in Error class (or a subclass), it usually has a .message property with a useful description.

If it's not (could be a string, object, number, or something else thrown), you convert it to a string so you still get some kind of message rather than an empty or undefined value.
*/