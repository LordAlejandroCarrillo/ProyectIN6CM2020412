import jwt from "jsonwebtoken";

import User from '../users/user.model'

export const  validateJWT = async (req, res, next) =>{
    const token = req.header('x-token')

    if(!toekn){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        })
    }

    try {
        
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKRY)

        const user = await User.find(uid)

        if(!user){
            return res.status(401).json({
                msg: 'Usuario no existe en la base de datos'
            })
        }

        if(!user.state){
            return res.status(401).json({
                msg: 'Token no valido - usuarios con estado: false'
            })
        }

        req.user = user

        next()

    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Token no valido'
        })
    }
}