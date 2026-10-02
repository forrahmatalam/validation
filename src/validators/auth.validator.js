import { body ,validationResult } from 'express-validator';


export const registerValidation = [
        body('email')
        .exists().withMessage('Email is required')
           .isEmail().withMessage('Email is invalid'),

           body('phone')
           .exists().withMessage('Phone is required')
           .isMobilePhone('en-IN').withMessage('Phone is invalid'),

           body('password')
           .exists().withMessage('Password is required')
           .trim().isLength({min:6}).withMessage('Password must be at least 6 characters'),

           (req,res,next)=>{
const errors = validationResult(req);

if(!errors.isEmpty()){
    return res.status(400).json({message:'Invalid request',errors:errors.array()});
}
next();
           }

    ]
