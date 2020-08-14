const express       = require('express')
    , router        = express.Router()
    , locationCtrl  = require('../../controllers/api/v1/store')

router.route('/store')
    .get(locationCtrl.getStores)
    .post(locationCtrl.addLocation);

router.route('/find/:id')
    .get(locationCtrl.getAddressById);

module.exports = router;

