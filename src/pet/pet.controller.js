import User from '../users/user.model.js'
import Pet from '../pet/pet.model.js'

export const savePet = async (req, res) => {
    try {
        const data =  req.body
        const user = await User.findOne({email: data.email})

        if(!user){
            return res.status(404).json({
                success: false,
                message : 'Owner not found'
            })
        }

        const pet = new Pet({
            ...data,
            keeper : user._id
        })

        await pet.save()

        res.status(200).json({
            success: true,
            pet
        })

    } catch (error) {  
        res.satuts(500).json({
            scucess: false,
            message: 'Error saving pet'
        })
    }
}

export const getPets = async (req, res) => {
    const { limit = 10, since = 0} = req.query
    const query = { status: true}
    try {
        const pets = await Pet.find(query)
            .skip(Number(since))
            .limit(Number(limit))
        
        const petsWithOwnerNames = await Promise.all(pets.map(async (pet)=>{
            const owner = await User.findById(pets.keeper)
            return {
                ...pet.toObject(),
                keeper: owner ? owner.name : "Owner not found"    
            }
        }))

        const total = await Pet.countDocuments(query)

        res.status(200).json({
            success: true,
            total,
            pets: petsWithOwnerNames
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error getting pets'
        })
    }
}

export const searchPet = async (req, res) => {
    const { id } = req.params

    try {
        
        const pet = await Pet.findById(id)

        if(!pet){
            return res.status(404).json({
                success: false,
                message: 'Pet not found'
            })
        }

        const owner = await User.findById(pet.keeper)

        res.status(200).json({
            success: true,
            pet: {
               ...pet.toObject(),
                keeper: owner? owner.name : "Owner not found"
            }
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error finding pet'
        })
        console.log(error)
    }
}

export const deletePet = async (req, res) => {
    const { id } = req.params

    try {
        
        await Pet.findByIdAndUpdate(id, { status: false })

        res.status(200).json({
            success: true,
            message: 'Pet deleted successfully'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting pet',
            error
        })
    }

}
