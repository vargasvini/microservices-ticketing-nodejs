import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError{
    statusCode = 400;

    constructor(public errors: ValidationError[]){
        super('Error at RequestValidation');
        //NEEDED WHEN EXTENDING BUILT IN CLASS
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors(){
        const errors = this.errors.map(err => { 
            return { 
                message: err.msg, 
                field: err.param
            }
        });
        return errors;
    }
}

