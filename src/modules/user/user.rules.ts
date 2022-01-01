import {checkSchema} from 'express-validator';

export const userRules: any = {
    createUser: checkSchema({
    username: {
      in: ['body'],
      trim: true,
      isString: true,
      isLength: {
        options: {min: 6},
        errorMessage: 'Username must be at least 6 characters long'
      },
      errorMessage: "please enter valid username"
    },
    email: {
      in: ['body'],
      trim: true,
      isEmail: true,
      errorMessage: "Please enter valid email"
    },
    password: {
      in: ['body'],
      trim: true,
      errorMessage: "Please enter valid password"
    },
    city: {
      in: ['body'],
      trim: true,
      isString: true,
      errorMessage: "Please enter valid city"
    },
     state: {
      in: ['body'],
      trim: true,
      isString: true,
      errorMessage: "Please enter valid state"
    },
    country: {
      in: ['body'],
      trim: true,
      isString: true,
      errorMessage: "Please enter valid country"
    },
    })
};