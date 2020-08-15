const express       = require('express')
    , router        = express.Router()
    , locationCtrl  = require('../../controllers/api/v1/store')
    , auth          = require('../../middleware/auth')

router.route('/store')
    .get(locationCtrl.getStores)
    .post( auth.auth, locationCtrl.addLocation);

router.route('/find/:id')
    .get(locationCtrl.getAddressById);

module.exports = router;

