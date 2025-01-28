import { Router } from "express"
import { check } from "express-validator"
import { login, register } from "./auth.controller.js"
import { validateFields } from "../middlewares/validate-fields.js"
import { existentEmail, isValidRole } from "../helpers/db-validator.js"

const router = Router()

router.post(
    '/login',
    [
        check('email', 'Este no es un correo válido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validateFields,
    ],
    login
)

router.post(
    '/register',
    [
        check('name' , 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El contraseña debe ser mayor a 6 carácteres').isLength({min : 6}),
        check('email', 'Esto no es un correo válido').isEmail(),
        check('email').custom(existentEmail),
        check('role').custom(isValidRole),
        check('phone', 'El teléfono debe contener 8 números').isLength({min : 8, max: 8}),
        validateFields
    ],
    register
)

export default router