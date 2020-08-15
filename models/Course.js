const mongoose         = require('mongoose')
    , mongoosePaginate = require('mongoose-paginate-v2')
    , uniqueValidator  = require('mongoose-unique-validator')

const CourseSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        min: 5,
        unique: true
    },
    description: {
        type: String,
        required: true,
        min: 5
    },
    media: {
        secure_url: { type: String, default: 'https://api.cloudinary.com/v1_1/dq8wjyayh/image/upload' },
        public_id: String
    },
    upload_date: {
        type: Date,
        default: Date.now,
    },
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor"},
    category: [String],
});

CourseSchema.plugin(mongoosePaginate);
CourseSchema.plugin(uniqueValidator);

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;

