import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required :[true, 'El nombre es requerido']

    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String,
    },
    phone:{
        type: String,
        minLenght: 8,
        maxLenght: 8,
        required:true,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE'],
    },
    state: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }
})

UserSchema.methods.toJSON = function(){
    const{__v, password, _id,...user} = this.toObject()
    user.uid = _id
    return user
}

export default mongoose.model('User', UserSchema)

