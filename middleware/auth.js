const jwt                                = require('jsonwebtoken')
    , config                             = require('config')
    , { successResponse, errorResponse } = require('../helpers/response')  

exports.auth = (req, res, next) => {
    const token = req.header("authentication-token").split("Bearer ")[1];

    if (token) {
        try {
            const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

            req.decoded = decoded
            userId      = decoded._id;
            roleUser    = decoded.role;
            next();
        } catch (err) {
            return res.status(403).json(errorResponse('Failed to authenticate token'))
        }
    } else {
        return res.status(401).json(errorResponse("No token provided"));
    }
}

