const mongoose = require('mongoose')
    , Mentor   = require('../../../models/Mentor')
    , Address  = require('../../../models/Store') 
    , { successResponse, errorResponse } = require('../../../helpers/response');

exports.newMentor = async (req, res) => {
    try{
        let mentor = await Mentor.findOne({ nik: req.body.nik });
        if(mentor) return res.status(422).send(errorResponse('Mentor already on Database'));

        const newMentor = await Mentor.create({
            nik: req.body.nik,
            name: req.body.name,
            education: req.body.education,
            occupation: req.body.occupation
        })

        if(!newMentor) return res.status(422).json(errorResponse("Failed to add new Mentor"));
        return res.status(200).json(successResponse("Success add new Mentor", newMentor));
    }catch (err) {

        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}


exports.showMentorList = async (req, res) => {
    let mentorList = await Mentor.find({}).populate('address', 'location').sort({ name: -1});

    return res.status(200).json(successResponse("Here is the Mentor list :", mentorList));
}


exports.deleteMentorById = async (req, res) => {
    try{
        let mentor = await Mentor.findById(req.params.id);
        if(!mentor) return res.status(404).json(errorResponse("Mentor does not exist"));

        await Address.deleteMany({ mentor_id: req.params.id });
        await Mentor.deleteOne({ _id: req.params.id });
        return res.status(200).json(successResponse("Delete Mentor is Success"));

    }catch(err){
        return res.status(423).json(errorResponse("Something went wrong when deleting Mentor", err));
    }
}


exports.getMentorById = async (req, res) => {
    try {
        let mentor = await Mentor
            .findById(req.params.id)
            .populate({
                path: 'address',
                select: 'address location',
            }).sort({
                name: -1
            });
        if(!mentor) return res.status(422).json(errorResponse("cannot find Mentor"));
        return res.status(200).json(successResponse("Here is the mentor Detail: ", mentor));
    }catch (err){
        return res.status(423).json(errorResponse("Something went wrong when get mentor data.", err));
    }
}



