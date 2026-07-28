import {body , validationResult}  from "express-validator"

export function validate(req,res, next){
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors :errors.array()})
     }
     next();
}

export const registerValidator = [

    body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({min:3 , max:30} ).withMessage(" Username but be Between 3 to 30 letters")
    .matches(/^[azA-Z)-9_]+$/).withMessage("Username can only contains letter"),

    body("email")
    .trim()
    .notEmpty().withMessage("Email Is Required")
    .isEmail().withMessage("Please Provide a Valid EmailId"),

    body("password")
    .notEmpty().withMessage("Password is Required")
    .isLength({min:6}).withMessage("Password must be 6v Character Long"),

    validate
] ;


