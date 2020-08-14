const mongoose = require('mongoose')
    , geocoder = require('../utils/geocoder');
const { Schema } = require('mongoose');

const StoreSchema = new mongoose.Schema({
    mentor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor"},
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    zipcode: {
        type: Number,
        required: [true, 'Please add your zipcode']
    },
    countryCode: {
        type: String,
        required: [true, 'Please add your countryCode']
    },
    location: {
        type: {
            type: String, 
            enum: ['Point'], 
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});


// Geocode & create Location
StoreSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address, 
                                       this.countryCode,  
                                       this.zipcode,  
                                       );
    console.log(loc);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,

    };
  
    // Do not save address
    // this.address = undefined;
    next();
});

const Address = mongoose.model('Address', StoreSchema);

module.exports = Address;
