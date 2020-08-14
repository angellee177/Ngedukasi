const faker   = require('faker')
    , Mentor  = require('./models/Mentor')
    , Address = require('./models/Store')

async function seedMentors() {
    try {
        const mentorData = new Mentor({
            nik       : "21720421",
            name      : "Ani",
            education : "Bachelor Degree",
            occupation: "HighSchool Teacher",
            category  : "Biology"
        })
        await Mentor.
    }
}