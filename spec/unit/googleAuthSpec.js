describe('Google Auth', () => {
  
  const GoogleAuth = require('../../lib/googleauth')

  describe('getLoginURL', () => {
    it('should get the OAuth login URL', (done) => {
      expect(GoogleAuth.getLoginURL()).not.toBe(null)
      done()
    })
  })

  describe('getUserDetails', () => {
    it('should return an error if no token is passed', (done) => {
      GoogleAuth.getUserDetails(null, (err, email) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should call the google auth service if token is passed', (done) => {
      GoogleAuth.getUserDetails(null, (err, email) => {
        expect(err).toBe(null)
        expect(email).not.toBe(null)
        done()
      })
    })
  })
})
