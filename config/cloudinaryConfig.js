const crypto     = require('crypto')
    , cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'dq8wjyayh',
    api_key   : '489289436653758',
    api_secret: 'gBFXtOhV2zBnpnsfnuEGyb1-yGE'
})

const { CloudinaryStorage } = require('multer-storage-cloudinary')
const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'garudaHack',
            allowedFormats: ['jpeg', 'jpg', 'png', 'mp4'],
            resource_type: 'auto',
        },
        filename: function (req, file, cb) {
            let buf = crypto.randomBytes(16);
            buf = buf.toString('hex');
            let uniqFileName = file.originalname.replace(/\.jpeg|\.jpg|\.png|\.mp4/ig, '');
            uniqFileName += buf;
            cb(undefined, uniqFileName);
        }
    });

module.exports = { cloudinary, storage }

