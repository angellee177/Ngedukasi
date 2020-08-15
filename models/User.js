const mongoose   = require('mongoose')
    , jwt        = require('jsonwebtoken')
    , config     = require('config')
    , bcrypt     = require('bcryptjs')
    , saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please input your username'],
        lowercase: true
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, 'What is your email dude?'],
        validate: function (email){
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    password: {
        type: String,
        validate: [
            function (password) {
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,30}$/.test(password)
            },
            'Password should contain at least one uppercase and lowercase letter, one number digit, and one special character. Password must be between 8 and 30 characters.'
        ]
    },
    user_type: {
        type: String,
        enum: ['0', '1', '2'],
        required: [true, 'Choose your role broh.']
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this.id, username: this.username, email: this.email, password: this.password, user_type: this.user_type}, 
                            config.get('jwtPrivateKey'),{expiresIn: '2h'})
    return token;
}

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next()
});

const User = mongoose.model('User', UserSchema);

module.exports = User;

