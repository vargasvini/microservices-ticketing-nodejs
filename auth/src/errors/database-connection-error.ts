import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
    statusCode = 500;
    reason = 'Error connecting to database';

    constructor(){
        super('Error at DatabaseConnection');
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(){
        const errors = [{
            message: this.reason,
        }];
        return errors;
    }
}