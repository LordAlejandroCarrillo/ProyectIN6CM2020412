import User from '../users/user.model.js'
import Pet from '../pet/pet.model.js'
import Appointment from './appointment.model.js'

export const addAppointment = async (req = request, res = response) => {
    try {
        const data = req.body
        const {id} = req.params
        const user = await User.findOne({email: data.email})
        const {date} = data

        const dateString = date
        const [datePart, timePart] = dateString.split(' ')
        const [day, month, year] = datePart.split('/').map(num => parseInt(num, 10))
        const [hours, minutes] = timePart.split(":").map(num => parseInt(num, 10))
        const dateObjetc = new Date(year, month - 1, day, hours, minutes)
        const isoDate = dateObjetc.toISOString()
        const formateDate = isoDate.replace('Z', '+00:00')

        if(!user){
            return res.status(404).json({
                success: false,
                message : 'Owner not found'
            })
        }

        const appointment = new Appointment({
            ...data,
            userRef : user._id,
            petRef : id,
            date : formateDate

        })

        await appointment.save()

        res.status(200).json({
            success: true,
            appointment
        })

    } catch (error) {  
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'Error saving appointment'
        })
    }
}

export const getQuotes = async  (req = request, res = response) => {
    try {
        const {limit = 10, since = 0} = req.query
        const query = {state : true}

        const [total, quotes] = await Promise.all([
            Appointment.countDocuments(query),
            Appointment.find(query)
                .skip(Number(since))
                .limit(Number(limit))
        ])
        
        res.status(200).json({
            succes: true,
            total,
            quotes
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg:'Error obtaining quotes',
            error
        })
    }
}

export const deleteAppointment = async (req, res) => {
    const { id } = req.params

    try {
        
        await Appointment.findByIdAndUpdate(id, { state: false })

        res.status(200).json({
            success: true,
            message: 'Appointment deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting appointment',
            error
        })
    }

}