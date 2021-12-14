const { assert} = require('chai')
const supertest = require('supertest')
const api = supertest('https://petstore.swagger.io')
const apiTestData = require('./data/test-data.js')

const { petCategory, petName, petURL, petTag, petStatus, v2petEndpoint, petNewName, petNewStatus } = apiTestData.testData.pet.workflow
let petID = Math.round(Math.random() * 1000)

describe('PUT /pet', function () {
    context('Add a New Pet', function(){
        it('Status 200 - Should add the correct pet ', function(done) {

            const headers = {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
            const requestBody = {
                "id": petID,
                "category": {
                    "id": 0,
                    "name": petCategory
                },
                "name": petName,
                "photoUrls": [
                    petURL
                ],
                "tags": [
                    {
                        "id": 0,
                        "name": petTag
                    }
                ],
                "status": petStatus
            }
        
            api.put(v2petEndpoint)
                .set(headers)
                .send(requestBody)
                .end(function(err, res) {
                    if (err) return done(err)
    
                    assert.equal(res.status, 200, 'status is not 200')
                    assert.equal(res.body.id, petID)
                    assert.equal(res.body.category.name, petCategory)
                    assert.equal(res.body.name, petName)
                    assert.equal(res.body.photoUrls[0], petURL)
                    assert.equal(res.body.tags[0].name, petTag)
                    assert.equal(res.body.status, petStatus)

                    done()
                })
    
        })
    })
})

describe('GET /pet', function () {
    context('Find pet by ID', function(){
        it('Status 200 - Should return the correct Pet ', function(done) {
            const headers = {
                accept: 'application/json',
            }

            api.get(`${v2petEndpoint}/${petID}`)
                .set(headers)
                .end(function(err, res) {
                    if (err) return done(err)

                    assert.equal(res.status, 200, 'status is not 200')
                    assert.equal(res.body.id, petID)
                    assert.equal(res.body.category.name, petCategory)
                    assert.equal(res.body.name, petName)
                    assert.equal(res.body.photoUrls[0], petURL)
                    assert.equal(res.body.tags[0].name, petTag)
                    assert.equal(res.body.status, petStatus)

                    done()
                })
        })
    })
})

describe('POST /pet', function () {
    context('Update Pet Data', function(){
        it('Status 200 - Should Update Pet data with new values ', function(done) {
            const headers = {
                accept: 'application/json',
                "Content-type": "application/x-www-form-urlencoded"
            }

            const requestBody = {
                name: petNewName,
                status: petNewStatus
            }

            // updating pet Data
            api.post(`${v2petEndpoint}/${petID}`)
                .set(headers)
                .send(requestBody)
                .end(function(err, res) {
                    if (err) return done(err)

                    assert.equal(res.status, 200, 'status is not 200')
                    assert.equal(res.body.code, 200)
                    assert.equal(res.body.type, 'unknown')
                    assert.equal(res.body.message, `${petID}`)

                    done()
                })
        })

        it('Status 200 - Pet is updated in DB with the new Values ', function(done) {
            const headers = {
                accept: 'application/json',
            }
            
            api.get(`${v2petEndpoint}/${petID}`)
                .set(headers)
                .end(function(err, res) {
                    if (err) return done(err)

                    assert.equal(res.status, 200, 'status is not 200')
                    assert.equal(res.body.id, petID)
                    assert.equal(res.body.category.name, petCategory)
                    assert.equal(res.body.name, petNewName, 'Name not updated')
                    assert.equal(res.body.photoUrls[0], petURL)
                    assert.equal(res.body.tags[0].name, petTag)
                    assert.equal(res.body.status, petNewStatus, 'Status not updated')

                    done()
                })
        })
    })
})