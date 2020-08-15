const faker   = require('faker')
    , Mentor  = require('./models/Mentor')
    , Course  = require('./models/Course')

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

module.exports = { seedMentors, seedCourse }