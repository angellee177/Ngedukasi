const mongoose = require('mongoose')
    , mongoosePaginate = require('mongoose-paginate-v2')


const MentorSchema = new mongoose.Schema({
    nik: {
        type: Number,
        required: [true, 'Please input your Identity Number']
    },
    name: {
        type: String,
        required: [true, 'Please input your name'],
        lowercase: true,
    },
    education: {
        type: String,
        required: [true, 'Please input your education'],
    },
    occupation: {
        type: String,
        required: [true, 'Please input your occupation'],
    },
    category: {
        type: String,
        required: [true, 'Please input your Lesson category'],
    },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address"}
});


// Add Paginate to Mentor Model
MentorSchema.plugin(mongoosePaginate);
const Mentor = mongoose.model("Mentor", MentorSchema);


module.exports = Mentor;
