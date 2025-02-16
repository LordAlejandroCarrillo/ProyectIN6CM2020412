import { Router } from "express"
import { check } from "express-validator"
import {validateFields} from "../middlewares/validate-fields.js"
import {validateJWT} from "../middlewares/validate-jwt.js"
import { getQuotes } from "./appointment.controller.js"
import {addAppointment, deleteAppointment} from "./appointment.controller.js"

const router = Router()
router.get("/", getQuotes)

router.post(
    "/:id",
    [
        validateJWT,
        check('email', 'This is not a valid email').not().isEmpty(),
        validateFields
    ],
    addAppointment
)

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "Is not a valid ID").isMongoId(),
        validateFields
    ],
    deleteAppointment
)

export default router