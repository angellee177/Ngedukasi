const express    = require('express')
    , router     = express.Router()
    , mentorCtrl = require('../../controllers/api/v1/mentor')

router.route('/store')
    .get(mentorCtrl.showMentorList)
    .post(mentorCtrl.newMentor)

router.route('/find/:id')
    .get(mentorCtrl.getMentorById)
    .delete(mentorCtrl.deleteMentorById)

module.exports = router;

