import { requireAuth, validateRequest } from "@goustiee-org/common";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import mongoose from 'mongoose';

const router = express.Router();

router.post('/api/orders', 
requireAuth,
    body('ticketId')
        .not()
        .isEmpty()
        //This custom validation is for testing purposes only
        //The problem here is that we are assuming that the ticket service uses mongo as its database
        //And by doing this we are creating a subtle coupling with another service
        .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
        .withMessage('TicketId must be provided'),
validateRequest,
async (req: Request, res: Response) => {
    res.send({});
});

export { router as showOrderRouter};