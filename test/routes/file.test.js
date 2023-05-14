const fs = require('fs')
const path = require('path')
const chai = require('chai')
const expect = chai.expect
const request = require('supertest')
const { appForTest: app } = require('../../src')
const { upload_folder_path } = require('../../config/multerConfig')
const { findOneByPublicKeyAndIncrementDownloads } = require('../../src/repositories/fileRepository')

describe('API endpoints from src/routes/files.js', function () {
    let publicKey, privateKey
    let testFilePartialName = 'sample'
    let testFileExtestion = '.txt'
    let testFilePath = './test/resources/' + testFilePartialName + testFileExtestion

    describe('POST /files', function () {
        it('should upload a new file and return a public key and a private key in response', function (done) {
            request(app)
                .post('/files')
                .attach('file', testFilePath)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err)
                    publicKey = res.body.data.publicKey
                    privateKey = res.body.data.privateKey
                    expect(res.body.status).to.equal('SUCCESS')
                    expect(publicKey).to.be.a('string')
                    expect(privateKey).to.be.a('string')
                    findOneByPublicKeyAndIncrementDownloads(publicKey)
                        .then((fileInfo) => {
                            filePath = path.join(upload_folder_path, fileInfo.name)
                            fs.exists(filePath, exists => {
                                if (!exists) throw new Error('File is not uploaded in storage')
                            })    
                        })
                        .then(_ => done())
                        .catch(err => done(err))
                })
        })

        it('should return a 400 error for a request without file', function (done) {
            request(app)
                .post('/files')
                .expect(400)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(res.body.status).to.equal('ERROR')
                    expect(res.body.errors[0]['msg']).to.equal("Field: 'file' is required")
                    expect(res.body.errors[0]['param']).to.equal('file')
                    expect(res.body.errors[0]['location']).to.equal('body')
                    done()
                })
        })
    })

    describe('GET /files/:publicKey', function () {
        it('should download an existing file', function (done) {
            request(app)
                .get('/files/' + publicKey)
                .expect(200)
                .expect('Content-Type', 'text/plain; charset=UTF-8')
                .end(done)
        })

        it('should return a 404 error for a non-existing file', function (done) {
            request(app)
                .get('/files/' + publicKey + 'abc')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(res.body.status).to.equal('ERROR')
                    expect(res.body.errors[0]['msg']).to.equal('Requestd File not found')
                    done()
                })
        })
    })

    describe('DELETE /files/:privateKey', function () {
        it('should remove an existing file and return a success message', function (done) {
            request(app)
                .delete('/files/' + privateKey)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(res.body.status).to.equal('SUCCESS')
                    expect(res.body.data.deleted).to.equal(1)
                    done()
                })
        })

        it('should return a 404 error for a non-existing file', function (done) {
            request(app)
                .delete('/files/' + privateKey + 'abc')
                .expect(404)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) return done(err)
                    expect(res.body.status).to.equal('ERROR')
                    expect(res.body.errors[0]['msg']).to.equal('Requestd File not found')
                    done()
                })
        })
    })
})
