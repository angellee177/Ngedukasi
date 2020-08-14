var chai     = require('chai')
    , expect = chai.expect

const { successResponse, errorResponse } = require('../../helpers/response')

describe("Response Helpers", function() {
    before(() => 
        sampleData = {
            nik: '2172221313132',
            name: 'Angel',
            education: 'Bachelor degree',
            occupation: 'Laravel Dev',
            category: 'code'
        },
        errSample = new Error()
    )
    it("checks success Response when called", function() {
        var response = successResponse('success', sampleData)
        expect(response.success).to.be.true
        expect(response.result).to.be.a('object')
    })
    it("checks error Response when called", function() {
        var response = errorResponse('failed', errSample, 401)
        expect(response.success).to.be.false
        expect(response.result).to.be.an("error")
    })
});