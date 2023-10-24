const mongoose = require('mongoose')
const {Schema, model} = mongoose

const sellerSchema = new Schema({
    nombre: String,
    identificacion: String,
    // telefono: Number,
    // correoElectronico: String,
    estado: Number
}) 

sellerSchema.set('toJSON', {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id,
        delete returnedObject.__v
    }
})

const Seller = model('Seller', sellerSchema)

module.exports = Seller