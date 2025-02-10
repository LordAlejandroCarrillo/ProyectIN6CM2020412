import { Router } from "express"
import { check } from "express-validator"
import { savePet } from "./pet.controller.js"
import {validateFields} from "../middlewares/validate-fields.js"
import {validateJWT} from "../middlewares/validate-jwt.js"

const router = Router()

router.post(
    "/",
    [
        validateJWT,
        check('email', 'This is not a valid email').not().isEmpty(),
        validateFields
    ],
    savePet
)

export default router