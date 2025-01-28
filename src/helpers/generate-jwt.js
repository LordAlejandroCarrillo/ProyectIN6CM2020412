import jwt from "jsonwebtoken";

export const generateJWT = (uid = '') => {
    return new Promise((resolve, reject) =>{
        const playLoad = {uid}
        jwt.sign(payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}