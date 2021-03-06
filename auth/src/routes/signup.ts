import express, {Request, Response, NextFunction} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError, validateRequest } from '@goustiee-org/common';
import { User } from '../models/user-schema';
import { Routes } from './routes-constants';

const router = express.Router();

router.post(Routes.SIGN_UP, [
  body('email')
    .isEmail()
    .withMessage('Email must be valid'),
  body('password')
    .trim()
    .isLength({min: 4, max:20})
    .withMessage('Pass must be between 4 and 20 characters!')
], 
validateRequest,
async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if(existingUser){
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    //Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    //Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
