describe('Google Auth', () => {
  
  const GoogleAuth = require('../../lib/googleauth')

  describe('getLoginURL', () => {
    it('should get the OAuth login URL', (done) => {
      expect(GoogleAuth.getLoginURL()).not.toBe(null)
      done()
    })
  })
})
