const stack = require('../../lib/stack')

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
  })
})
