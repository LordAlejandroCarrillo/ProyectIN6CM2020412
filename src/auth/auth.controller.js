import bcryptjs from "bcryptjs";
import User from "../users/user.model.js";
import { generateJWT } from "../helpers/generate-jwt.js";

export const login = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({
                msg: 'Credenciales incorrectas, Correo no existe en la base de datos'
            })
        }

        if(!usuario.state){
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password)
        if(!validPassword){
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            })
        }

        const token = await generateJWT(user.id)
        res.status(200).json({
            msg: 'Login OK!!!!',
            user,
            token
        })

    } catch (e) {
        console.log(e)
        res.status(500).json({
            msg: 'Comuniquese con el administrador'
        })
    }
}

export const register = async (req, res)=>{

    const {name, email, password, role, phone} = req.body
    const user = new User({nombre, correo, password, role, phone})

    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    await user.save()
    res.status(200).json({
        user,
    })
}