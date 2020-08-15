const faker    = require('faker')
    , Mentor   = require('./models/Mentor')
    , Course   = require('./models/Course')
    , User     = require('./models/User')
    , Addresss = require('./models/Address')

async function seedUsers() {
    try {
        let password   = 'Password@123'
        let userExist  = await User.findOne({ email: 'ani@yopmail.com'});
        let userExist2 = await User.findOne({ email: 'budi@yopmail.com'});

        if(!userExist && !userExist2) {
            const userData = new User({
                username: 'Ani ajjah',
                email: 'ani@yopmail.com',
                user_type: '1',
                password: password,
            })
            await userData.save();

            const userData2 = new User({
                username: 'Budi brohh',
                email: 'budi@yopmail.com',
                user_type: '1',
                password: password,
            })
            await userData2.save();

            console.log('2 new Users created');
        }  

    } catch (err) {
        console.log(err.message);
    }
}

async function seedMentors() {
    try {   
            let user  = await User.findOne({ username: 'ani ajjah'});
            let user1 = await User.findOne({ username: 'budi brohh'});
            let mentorExist  = await Mentor.findOne({ nik: '21720421'});
            let mentorExist1 = await Mentor.findOne({ nik: '21720422'});
   
            if(!mentorExist && !mentorExist1 ) {
                const mentorData = new Mentor({
                    nik       : "21720421",
                    name      : "Ani",
                    education : "Bachelor Degree",
                    occupation: "HighSchool Teacher",
                    category  : "Biology",
                    user_id   : user._id,

                })
                let mentor = new Mentor(mentorData);
                await mentor.save();
        
                const mentorData1 = new Mentor({
                    nik       : "21720422",
                    name      : "Budi",
                    education : "Master Degree",
                    occupation: "Software Developer",
                    category  : "Android Dev",
                    user_id   : user1._id,
                })
                let mentor1 = new Mentor(mentorData1);
                await mentor1.save();

                console.log("2 new Mentors created.");
            }
    }catch (err) {
        console.log(err.message)
    }
}

async function seedCourse() {
    try {
            let mentor        = await Mentor.findOne({name : 'ani'});
            let mentor2       = await Mentor.findOne({name : 'budi'});
            let courseExist  = await Mentor.findOne({name : 'ani', course: { $gt: [] } });
            let courseExist2 = await Mentor.findOne({name : 'budi', course: { $gt: [] } });
    
            if( mentor && !courseExist) {
                for( const i of new Array(5)) {
                    const title       = faker.lorem.sentence();
                    const description = faker.lorem.text();
        
                    const courseData = {
                        mentor : mentor._id,
                        title,
                        description,
                    }
                    let course = new Course(courseData);
                    await course.save();

                    Mentor.updateOne(
                        { _id: mentor._id},
                        { $push: { course: course._id } }
                    ).exec()
                }
                console.log("Course have been add for Ani");
            }

        

            if( mentor2 && !courseExist2) {
                for( const i of new Array(5)) {
                    const title       = faker.lorem.sentence();
                    const description = faker.lorem.text();
    
                    const courseData2 = {
                        mentor : mentor2._id,
                        title,
                        description
                    }
                    let course2 = new Course(courseData2);
                    await course2.save();
    
                    Mentor.updateOne(
                        { _id: mentor2._id},
                        { $push: { course: course2._id} }
                    ).exec()
                }
                console.log("Course have been add for Budi");
            }
            

    } catch (err) {
        console.log(err.message);
    }
}

async function seedAddress() {
    try {
        let mentor        = await Mentor.findOne({name : 'ani'});
        let mentor2       = await Mentor.findOne({name : 'budi'});
        let addressExist  = await Mentor.findOne({name : 'ani', address: { $gt: [] } });
        let addressExist2 = await Mentor.findOne({name : 'budi', address: { $gt: [] } });
    
        if(!mentor && !addressExist ) {
            const addressData = new Addresss({
                mentor_id   : mentor._id,
                address     : "Kopkar PLN Housing Batam Centre, Jl. Orchard Boulevard, Belian, Batam Kota, Batam City, Riau Islands 29444, Indonesia",
                zipcode     : "29444",
                countryCode : "ID",
            })
            let address = new Addresss(addressData);
            await address.save();
        }

        if(mentor2 && !addressExist2){
            const addressData1 = new Addresss({
                mentor      : mentor2._id,
                address     : "Masjid Al Hidayah, PLN, PERUMAHAN KOPKAR PLN BLOK H NO.8 Kel. Belian Kecamatan Batam Kota Depan Masjid Jami Kopkar, Belian, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29432",
                zipcode     : "29432",
                countryCode : "ID",
            })
            let address1 = new Addresss(addressData1);
            await address1.save();
        }
        console.log("2 new Address created.");
    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { seedUsers, seedMentors, seedCourse, seedAddress }