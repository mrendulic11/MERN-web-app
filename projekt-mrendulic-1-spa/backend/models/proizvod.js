const mongoose = require('mongoose')

const proizvodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  opis: String,
  price: { type: Number, min: 1, required: true },
  ducan: { type: String, required: true },
  omiljen: Boolean,
  korisnik: { type: mongoose.Schema.Types.ObjectId, ref: 'Korisnik' }
})

/*Transformiranje id-a */
proizvodSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = doc._id.toString()
        delete ret._id
        delete ret.__v
        return ret
    }
})

const Proizvod = mongoose.model('Proizvod', proizvodSchema, 'proizvodi')

module.exports= Proizvod;