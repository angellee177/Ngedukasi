const { errorResponse } = require('../helpers/response')

exports.isAdmin = (req, res, next) => {
    if(roleUser !== 0) {
        return res.status(401).json(errorResponse("Sorry, you cannot access this content"));
    }
    roleUser, userId
    next()
}

