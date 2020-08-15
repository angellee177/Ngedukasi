const mongoose   = require('mongoose')
    , Mentor     = require('../../../models/Mentor')
    , Course     = require('../../../models/Course')
    , cloudinary = require('cloudinary')
    , { successResponse, errorResponse } = require('../../../helpers/response')


exports.newCourse = async (req, res) => {
    try {
            let mentor = await Mentor.findById( req.body.mentor );
            if(!mentor) return res.status(422).json(errorResponse("Failed to find Mentor"));

        let newCourse = new Course({
            title: req.body.title,
            description: req.body.description,
            mentor: req.body.mentor,
            category: req.body.category,
        });

        await newCourse.save();
        await Mentor.updateOne(
            { _id: req.body.mentor_id },
            { $push: { course : newCourse._id } }
        )

        return res.status(200).json(successResponse("Success add new Course", newCourse));
    }catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('mentor', 'name');
        if(!course) return res.status(422).json(errorResponse("cannot find mentor in database."));

        return res.status(200).json(successResponse("Success get Course by ID", course));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getCourses = async (req, res) => {
    try {
        const course = await Course.find({}).populate({ path: 'mentor', select: 'name' }).sort({date: -1});
        return res.status(200).json(successResponse("Success get Course list", course));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getCourseByCategory = async (req, res) => {
    try {
        const course = await Course.find({ category: req.params.category })
                        .populate('mentor', 'name')
                        .sort({ date: -1 });
        return res.status(200).json(successResponse("All Video courses: ", course ));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getCourseByMentor = async (req, res) => {
    try {
        const populateQuery = [{ path: 'mentor', select: 'name' }]
        const course = await Course.find({ mentor: req.params.mentor_id }).populate(populateQuery).sort({ date: -1 });

        return res.status(200).json(successResponse("this is mentor courses list : ", course));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.uploadCoursesPicture = async (req, res) => {
    try {
        let course = await Course.findById(req.params.id);
        if(!course) return res.status(421).json(errorResponse("Failed to find Course"));
   
        if(req.file) {
            if(req.file.mimetype !== 'image/jpg' && req.file.mimetype !== 'image/jpeg' && req.file.mimetype != 'image/png' && req.file.mimetype != 'video/mp4') 
            {
                return res.status(422).json(errorResponse("Unsupported Media Type"));
            }
            
            if (course.media.public_id) await cloudinary.v2.uploader.destroy(course.media.public_id);
            console.log(req.file);
            const { secure_url , public_id } = {secure_url: req.file.path , public_id: req.file.filename };
            course.media = { secure_url, public_id };
            let result = await course.save();

            return res.status(200).json(successResponse("Success upload Media.", result));
        }
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.findCourseByQuery = async (req, res) => {
    try {
        const course = await Course.find(req.query).populate('mentor', 'name').sort({ date: -1 });
        if(course.length === 0) return res.status(422).json(errorResponse(`there is no courses for ${req.query}`));
    
        return res.status(200).json(successResponse("Search Result:", course));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.findByRegex = async (req, res) => {
    try {
        const course = await Course.find({ title: { $regex: '.*' + req.query.title +  '.*'} })
                                   .populate('mentor', 'name')
                                   .sort({ date: -1 });
        return res.status(200).json(successResponse(`Here is the result for ${req.query.title} :`, course));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

