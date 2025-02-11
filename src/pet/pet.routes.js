import { Router } from "express"
import { check } from "express-validator"
import { savePet, getPets, searchPet, deletePet } from "./pet.controller.js"
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


router.get("/", getPets)

router.get(
    "/:id",
    [
        validateJWT,
        check("id", "Is not a valid ID").isMongoId(),
        validateFields
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validateJWT,
        check("id", "Is not a valid ID").isMongoId(),
        validateFields
    ],
    deletePet
)

export default router