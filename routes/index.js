const express        = require('express')
    , router         = express.Router()
    , mentorRouter   = require('./v1/mentor')
    , locationRouter = require('./v1/location')
    , courseRouter   = require('./v1/course')

router.get('/', function (req, res) {
    res.status(200).json({
        success: true,
        message: "Welcome to GarudaHack API !",
    });
});

router.use('/mentor', mentorRouter);
router.use('/location', locationRouter);
router.use('/course', courseRouter);

module.exports = router;
