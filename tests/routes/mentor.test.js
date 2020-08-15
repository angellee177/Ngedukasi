const mongoose  = require('mongoose')
    , chai      = require('chai')
    , chaihttp  = require('chai-http')
    , faker     = require('faker')
    , expect    = chai.expect

const server  = require('../../index')
    , Mentor  = require("../../models/Mentor")
    , Address = require('../../models/Address')
    , { seedMentor, seedCourse } = require('../../dataSeed');

chai.use(chaihttp);
chai.should();

describe('Mentor', () => {
    describe('Preliminary', () => {
        before(done => {
            Mentor.deleteMany({})
            .then(() => {
                seedMentor()
                seedCourse()
                    .then(() => done())
            });
        });
        
        afterEach(done => {
            Mentor.deleteMany({})
            .then((result) => {
                done();
            })
        })
    });

    describe('/POST Mentor Routes', () => {
        it("Add new Mentor should show OK", function (done) {
            chai.request(server)
                .post('/api/v1/mentor/store')
                .send({
                    nik        : "21720421",
                    name       : "Cindy",
                    education  : "High School",
                    occupation : "Programmer",
                    category   : "Front End Class"
                }) 
                .end(function (err, res) {
                    mentorId = res.body.result._id;
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(true);
                    res.body.should.have.property('message').equal("Success add new Mentor");
                    res.should.be.an("object");
                    done();
                })
        });


        it("Add new Mentor with same NIK should be failed", function (done) {
            chai.request(server)
                .post('/api/v1/mentor/store')
                .send({
                    nik        : "21720421",
                    name       : "Fenny",
                    education  : "Bachelor",
                    occupation : "Programmer",
                    category   : "Backend Dev"
                })
                .end(function (err, res) {
                    expect(res).to.have.status(422)
                    res.body.should.have.property('success').equal(false);
                    res.body.should.have.property('message').equal("Mentor already on Database");
                    expect(res).to.be.an('object')
                    done()
                })
        })

        it("Add new Mentor with invalid Input should be failed", function (done) {
            chai.request(server)
                .post('/api/v1/mentor/store')
                .send({
                    nik        : "21720422",
                    name       : "Cindy",
                    education  : "High School",
                    occupation : "Programmer",
                    category   : ""
                })
                .end(function (err, res) {
                    expect(res).to.have.status(423)
                    res.body.should.have.property('success').equal(false);
                    res.body.should.have.property('message').equal("Request is not quite right");
                    expect(res).to.be.an('object')
                    done()
                })
        })

    });

    describe('/GET Mentor Routes', () => {
        it("should show all Mentors, should be OK", function (done) {
            chai.request(server)
                .get('api/v1/mentor/store')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.should.have.property('success').equal(true);
                    res.body.should.have.property('message').equal("Here is the Mentor list :");
                    res.should.be.an("object");
                    done();
                });
        })
    });
});
