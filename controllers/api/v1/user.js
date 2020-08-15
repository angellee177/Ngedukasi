const User    = require('../../../models/User')
    , Mentor  = require('../../../models/Mentor')
    , Course  = require('../../../models/Course')
    , Address = require('../../../models/Address.js')
    , bcrypt  = require('bcryptjs')
    , { successResponse, errorResponse } = require('../../../helpers/response')


exports.postRegister = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(user) return res.status(421).json(errorResponse('Hey, sorry! User already registered.'));

        user = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            user_type: req.body.user_type
        });

        const result = await user.save()
        return res.status(200).json(successResponse("Yeay ! you are successfully register!", result));
    } catch (err) {
        return res.status(423).json(errorResponse('Request is not quite right', err));
    }
}

exports.userLogin = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if(!user) return res.status(421).json(errorResponse("Sorry, but i cannot find your email."));

        let validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(422).json(errorResponse("Sorry, please try to input your password once again."));

        let token = user.generateAuthToken();
        return res.status(200).json(successResponse("Yeayy !! succesfully login.", token));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getUserList = async (req, res) => {
    try {
            let userList = await User.find({}).sort( { created_at: -1 } );
            return res.status(200).json(successResponse("We got it! here is your User list:", userList));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right"));
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) return res.status(421).json(errorResponse("Sorry, we cannnot find user data."));

        const mentor = Mentor.find({ user_id: req.params.id });
        await Course.deleteMany({ mentor: mentor._id });
        await Address.deleteOne({ mentor_id: mentor._id });
        await Mentor.deleteOne({ user_id: req.params.id });
        await User.deleteOne({ _id: req.params.id });
        
        return res.status(200).json(successResponse(`Yeayy! you are successfully delete ${user.name}`));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.currentUser = async (req, res) => {
    try {
        let user = await User.findById(userId);
        return res.status(200).json(successResponse("Current login Information is: ", user));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right"));
    }
}

exports.updateUser = async (req, res) => {
    try {
            let user = await User.findByIdAndUpdate( {_id: userId },
                    {
                        $set: req.body 
                    }, { 'new': true, runValidators: true, context: 'query' });

            return res.status(200).json(successResponse("Yeayy !! success updated your profile", user));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

exports.getUserById = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        if(!user) return res.status(422).json(errorResponse("Sorry, we cannot find your data"));

        return res.status(200).json(successResponse("Yeayy ! here is your detail informations", user));
    } catch (err) {
        return res.status(423).json(errorResponse("Request is not quite right", err));
    }
}

