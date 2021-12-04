import { Request } from 'express';
import { check } from 'express-validator/check';

export const userRules: any = {
  forSignIn: [
    check('email')
      .isEmail()
      .withMessage('Invalid email address'),

    check('password')
      .isLength({ min: 5 })
      .withMessage('Password should be greater than 5 char'),

      check('mpin')
      .isLength({ min: 6, max: 6 })
      .withMessage('Mpin must be 6 digit'),
  ],
  forSignUser: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Please enter email address')
      .isEmail()
      .withMessage('Invalid email address'),

    check('password')
      .not()
      .isEmpty()
      .withMessage('Please enter password')
      .isLength({ min: 5 })
      .withMessage('Password should be greater than 5 char'),

    check('confirmPassword')
      .not()
      .isEmpty()
      .withMessage('Please enter confirm password')
      .custom(
        (value: string, options: { req: Request }) =>
          value === options.req.body.password,
      )
      .withMessage('Password and Confirm password are not same.'),

    check('mpin')
      .not()
      .isEmpty()
      .withMessage('Please enter mpin')
      .isLength({ max: 6 })
      .withMessage('Mpin must have 6 digit'),

    check('confirmMpin')
      .not()
      .isEmpty()
      .withMessage('Please enter confirm mpin')
      .custom(
        (value: string, options: { req: Request }) =>
          value === options.req.body.mpin,
      )
      .withMessage('Mpin and Confirm Mpin are not same.'),
    check('username')
      .not()
      .isEmpty()
      .withMessage('Please enter username name'),
  ],

  forUpdateUser: [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Please enter email address')
      .isEmail()
      .withMessage('Invalid email address'),
  ],
};
