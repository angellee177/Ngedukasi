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


