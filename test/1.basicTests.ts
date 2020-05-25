/* eslint-disable no-unused-expressions */
import { describe, it } from 'mocha'
import chai from 'chai'
import chaiHttp from 'chai-http'
import http from 'http'
import app from '../src/app'
import { request } from '../src/lib/request.interface'

chai.use(chaiHttp)
const { expect } = chai

const worker = chai
  .request((req: request, res: http.ServerResponse) => {
    app.engine(req as request, res as http.ServerResponse)
  })
  .keepOpen()

describe(' => Testing Framework Components', () => {
  /**
   * Test if the root directory is being catched by
   * router * Very common bug due to splitting due to
   *  slashes and trimming tail slashes
   */
  it('Testing root directory attachment', (done) => {
    try {
      worker.get('/').then((resp) => {
        expect(resp.body.error).to.be.false
        expect(resp.body.message).to.be.a('string')
        done()
      })
    } catch (error) {
      done(error)
    }
  })

  /**
   * Test if headers are successfully received when sent
   * from same router layer
   */
  it('testing normal route operation', (done) => {
    worker
      .get('/home')
      .then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.error).to.be.false
        console.log('Headers NOT RECEIVED')
        done()
      })
      .catch((err) => console.log(err.message))
  })

  /**
   * Test if headers are successfully set when done from
   * multiple middlwares ( layers)
   */
  it('testing subsequent middleware usage', (done) => {
    try {
      worker.get('/multiple').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.error).to.be.false
        expect(resp.body.finished).to.be.true
        done()
      })
    } catch (error) {
      done(error)
    }
  })

  /**
   * Test if router is able to correctly match routes
   * and extract params from url
   */
  it('testing param extraction from request', (done) => {
    try {
      worker.get('/params/apple/mango/banana/end').then((resp) => {
        expect(resp.status).to.equal(200)
        expect(resp.body.one).to.equal('apple')
        expect(resp.body.two).to.equal('mango')
        expect(resp.body.three).to.equal('banana')
        done()
      })
    } catch (error) {
      done(error)
    }
  })
})
