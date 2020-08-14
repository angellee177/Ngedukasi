const mongoose  = require('mongoose')
    , chai      = require('chai')
    , chaihttp  = require('chai-http')
    , faker     = require('faker')
    , expect    = chai.expect

const server  = require('../../index')
    , Mentor  = require("../../models/Mentor")
    , Address = require('../../models/Store')
    , { seedMentor } = require('../../dataSeed')

chai.use(chaihttp);
chai.should();

describe('Mentor', () => {
    before(done => {
        Mentor.deleteMany({},
            { new: true }
        ).exec(() => {
            done()
        });
    });

    it("Add new Mentor should show OK", function (done) {
        chai.request(server)
            .post('/api/v1/') 
    });
});
