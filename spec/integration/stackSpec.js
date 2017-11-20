const stack = require('../../lib/stack')
const CONSTANTS = require('../../lib/constants')

describe('stack', () => {
  describe('createStack', () => {
    it('should return an error when no stack name is passed', (done) => {
      stack.createStack(null, '32132', (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should return an error when no file name is passed', (done) => {
      stack.createStack('test', null, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should return an error if the template file doesnt exist', (done) => {
      stack.createStack('test', `${__dirname}/../../templates/error.yml`, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should deploy the stack when template file is valid', (done) => {
      stack.createStack('test', `${__dirname}/../../${CONSTANTS.SINGLE_NODE_TEMPLATE}`, (err, data) => {
        console.log(data)
        expect(err).toBe(null)
        expect(data).not.toBe(null)
        done()
      })
    })
  })
})
