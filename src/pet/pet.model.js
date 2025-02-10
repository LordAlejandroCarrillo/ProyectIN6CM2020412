import { Schema, model } from "mongoose";
 
const PetSchema = Schema({
    name:{
        type:String,
        required: true
 
    },
 
    description:{
        type: String,
        required: true
    },
 
    age:{
        type: Number,
        required: true
    },
 
    type:{
        type: String,
        uppercase: true,
        require: true
    },
    keeper:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        require : true
 
    },
    status:{
        type : Boolean,
        default: true
    }
},{
    timeStamps: true,
    versionKey: false
 
});
 
export default model ('Pet', PetSchema);