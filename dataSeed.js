const faker   = require('faker')
    , Mentor  = require('./models/Mentor')
    , Address = require('./models/Address')

async function seedMentors() {
    try {
            let mentorExist  = await Mentor.findOne({ nik: '21720421'});
            let mentorExist1 = await Mentor.findOne({ nik: '21720422'});

            if(!mentorExist && !mentorExist1 ) {
                const mentorData = new Mentor({
                    nik       : "21720421",
                    name      : "Ani",
                    education : "Bachelor Degree",
                    occupation: "HighSchool Teacher",
                    category  : "Biology"
                })
                let mentor = new Mentor(mentorData);
                await mentor.save();
        
                const mentorData1 = new Mentor({
                    nik       : "21720422",
                    name      : "Budi",
                    education : "Master Degree",
                    occupation: "Software Developer",
                    category  : "Android Dev"
                })
                let mentor1 = new Mentor(mentorData1);
                await mentor1.save();

                console.log("2 new Mentors created.");
            }
    }catch (err) {
        console.log(err.message)
    }
}

async function seedAddress() {
    try {
            let mentor        = await Mentor.findOne({name : 'ani'});
            let mentor2       = await Mentor.findOne({name : 'budi'});
            let addressExist  = await Mentor.findOne({name : 'ani', address: { $gt: [] } });
            let addressExist2 = await Mentor.findOne({name : 'budi', address: { $gt: [] } });

            if( mentor && !addressExist) {
                const address     = faker.address.streetAddress();
                const addressData = {
                    mentor_id : mentor._id,
                    address,
                    country: faker.address.country(),
                }
                let location = new Address(addressData);
                await location.save();

                Mentor.updateOne(
                    { _id: mentor._id},
                    { $push: { address: location._id} }
                ).exec()
            }

            console.log("Address have been add for Ani");

            if( mentor2 && !addressExist2) {
                const address     = faker.address.streetAddress();
                const addressData = {
                    mentor_id : mentor2._id,
                    address,
                    country: faker.address.country(),
                }
                let location = new Address(addressData);
                await location.save();

                Mentor.updateOne(
                    { _id: mentor2._id},
                    { $push: { address: location._id} }
                ).exec()
            }
            console.log("Address have been add for Budi");

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { seedMentors, seedAddress }