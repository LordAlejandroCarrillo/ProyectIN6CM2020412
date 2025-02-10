import { Router } from "express"
import { check } from "express-validator"
import { getUsers, getUserById, updateUser, deletUser } from "./user.controller.js"
import { userExistsById } from "../helpers/db-validator.js"
import {validateFields} from "../middlewares/validate-fields.js"
import { uploadProfilePicture } from "../middlewares/multer-upload.js"
const router = Router()

router.get("/", getUsers)

router.get(
    "/findUser/:id",
    [
        check("id", "Is not a valid ID").isMongoId(),
        check("id").custom(userExistsById),
        validateFields
    ],
    getUserById
)

router.put(
    "/:id",
    uploadProfilePicture.single('profilePicture'),
    [
        check("id", "Is not a valid ID").isMongoId(),
        check("id").custom(userExistsById),
        validateFields
    ],
    updateUser

)

router.delete(
    "/:id",
    [
        check("id", "Is not a valid ID").isMongoId(),
        check("id").custom(userExistsById),
        validateFields
    ],
    deletUser
)

export default router