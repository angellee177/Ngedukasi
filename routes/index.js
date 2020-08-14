const express      = require('express')
    , router       = express.Router()
    , mentorRouter = require('./v1/mentor')

router.get('/', function (req, res) {
    res.status(200).json({
        success: true,
        message: "Welcome to GarudaHack API !",
    });
});

router.use('/mentor', mentorRouter);

module.exports = router;
