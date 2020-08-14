const mongoose  = require('mongoose')
    , Address   = require('../../../models/Address')
    , Mentor    = require('../../../models/Mentor')
    , { successResponse, errorResponse } = require('../../../helpers/response')


exports.getAddressById = async (req, res) => {
    try {
        const location = await Address.findById(req.params.id).populate('mentor_id', 'name').sort({ created_at: -1});

        if(!location) return res.status(422).json("cannot find ")
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

            const mentor = await Mentor.findById(req.body.mentor_id);
            if(!findMentor) return res.status(422).json(errorResponse("Failed to find Mentor"));

            const address = await Address.create({
                mentor_id: req.body.mentor_id,
                address: req.body.address,
            });
            console.log(address);
            await mentor.address.push(address); 
            const newData = await mentor.save();

            console.log(newData);
            
            return res.status(200).json(successResponse("Success add new Address", address));
    }catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}


