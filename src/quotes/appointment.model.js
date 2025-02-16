import { Schema, model } from "mongoose";

const AppointmentSchema = Schema(
    {
        date: {
            type: String,
            required: [true, "Date is required to make an appointment"]
        },
        description : {
            type: String,
            required: [true, "Description is required"]
        },
        lifespan: {
            type: String,
            required: [true, "Lifespan is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"]
        },
        petRef:{
            type: Schema.Types.ObjectId,
            ref: 'pet',
            require : true
     
        },
        userRef:{
            type: Schema.Types.ObjectId,
            ref: 'user',
            require : true
        },
        state: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
);


export default model('Appointment', AppointmentSchema);