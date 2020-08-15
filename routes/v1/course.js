const express     = require('express')
    , router      = express.Router()
    , courseCtrl  = require('../../controllers/api/v1/course')
    , multer      = require('multer')
    , { storage } = require('../../config/cloudinaryConfig')
    , upload      = multer({ storage })

router.route('/upload/:id')
    .post(upload.single('image'), courseCtrl.uploadCoursesPicture);
router.route('/store')
    .get(courseCtrl.getCourses)
    .post(courseCtrl.newCourse)

router.route('/find/:id')
    .get(courseCtrl.getCourseById)

router.route('/find-mentor/:mentor_id')
    .get(courseCtrl.getCourseByMentor)

router.route('/find-category/:category')
    .get(courseCtrl.getCourseByCategory)

router.route('/search')
    .get(courseCtrl.findCourseByQuery);

router.route('/find-news')
    .get(courseCtrl.findByRegex)

    
module.exports = router;

