import { response, request } from "express"
import { hash, verify } from "argon2"
import User from "./user.model.js"

export const getUsers = async  (req = request, res = response) => {
    try {
        const {limit = 10, since = 0} = req.query
        const query = {state : true}

        const [total, users] = await Promise.all([
            User.countDocuments(query),
            User.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ])
        
        res.status(200).json({
            succes: true,
            total,
            users
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error obtaining users',
            error
        })
    }
}

export const getUserById = async (req,res) => {
    try {
        const {id} = req.params

        console.log('hola')
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                succes: false,
                msg: "Uusuario no found"
            })
        }
        res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:"Error obtainning user",
            error
        })
    }
}

export const updateUser = async (req, res = response)=>{
    try {
        
        const {id} = req.params
        const {_id, password, email, ...data} = req.body

        if(password){
            data.password = await hash(password)
        }

        const user = await User.findByIdAndUpdate(id, data, {new:true})

        res.status(200).json({
            success: true,
            msg: "User updated",
            user
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error updating user',
            error
        })
    }
}

export const deletUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndUpdate(id, {state:false}, {new:true})
        const authenticatedUser = req.user
        res.status(200).json({
            success:true,
            msg:"User desactivated",
            user,
            authenticatedUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error desactivating user',
            error
        })
    }
}