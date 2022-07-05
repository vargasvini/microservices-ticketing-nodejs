import { IError } from "../../../auth/src/interfaces/error-interface";

export abstract class CustomError extends Error {
    abstract statusCode: number;
    constructor(message: string){
        super(message);
        //NEEDED WHEN EXTENDING BUILT IN CLASS
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    abstract serializeErrors(): Array<IError>;
}