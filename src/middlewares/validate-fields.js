import { validationResult } from "express-validator";

export const validateFields = (req, res, next) => {
    const errors = validationResult(req)

    if(!console.error.isEmpty()){
        return res.status(400).json(errors)
    }
    
    next()
}