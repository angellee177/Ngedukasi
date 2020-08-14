const mongoose  = require('mongoose')
    , Address   = require('../../../models/Address')
    , Mentor    = require('../../../models/Mentor')
    , { successResponse, errorResponse } = require('../../../helpers/response')


exports.getAddressById = async (req, res) => {
    try {
        const location = await Address.findById(req.params.id).populate('mentor_id', 'name');

        if(!location) return res.status(422).json("cannot find ");

        return res.status(200).json(successResponse("Success get Address by ID", location));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getStores = async (req, res) => {
    try {
        const address = await Address.find({}).populate('mentor_id', 'name').sort({created_at: -1});


        return res.status(200).json(successResponse("Success get location list: ", address));
    }catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.addLocation = async (req, res) => {
    try {

            let mentor = await Mentor.findById(req.body.mentor_id);

            if(!mentor){
                return res.status(422).json("Failed to find Mentor");
            }else{

                let newAddress = new Address({
                    mentor_id: req.body.mentor_id,
                    address: req.body.address,
                    country: req.body.country,
                });

                await newAddress.save();
                await Mentor.updateOne(
                    { _id: req.body.mentor_id },
                    { $push: { address: newAddress._id } }
                )
                    
                return res.status(200).json(successResponse("Success add new Address", newAddress));
            }
    }catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}


