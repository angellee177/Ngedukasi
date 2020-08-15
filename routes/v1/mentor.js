const express    = require('express')
    , router     = express.Router()
    , mentorCtrl = require('../../controllers/api/v1/mentor')
    , auth       = require('../../middleware/auth')     

router.route('/store')
    .get(mentorCtrl.showMentorList)
    .post(auth.auth, mentorCtrl.newMentor)

router.route('/find')
    .get(mentorCtrl.getMentorByName);

router.route('/find/:id')
    .get(mentorCtrl.getMentorById)
    .delete(mentorCtrl.deleteMentorById)

module.exports = router;

