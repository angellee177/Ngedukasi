const express        = require('express')
    , router         = express.Router()
    , userController = require('../../controllers/api/v1/user')
    , auth           = require ('../../middleware/auth')

router.route('/')
    .post(userController.postRegister)
    .get(auth.auth, userController.getUserList)

router.route('/find/:id')
    .delete(auth.auth, userController.deleteUser)
    .get(userController.getUserById)

router.route('/login')
    .post(userController.userLogin)

router.route('/profile')
    .get(auth.auth, userController.currentUser)

router.route('/update')
    .put(auth.auth, userController.updateUser)

module.exports = router;


