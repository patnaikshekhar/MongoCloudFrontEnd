const proxyguire = require('proxyquire')

const requestStub = (params, callback) => {
  callback(null, { 
    body: JSON.stringify({
      access_token: 'ya29.GlsABT6Dh8hZMMb5JDgLLmW7RR_dx7qZp-c-l6BDfVLz71ssc4YzIhUnDPRmSJ95FCUplz4gG_6j59hIaSY0_hJI99Gs2dyUVAU1ywWUFopSa9pnPeSmGFW2sBb2',
      id_token: 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFjMTYxMDBmODU0YzQ0MzEzM2E3NTI4MDZjYmU1MmRjMWQ3YzJjZDAifQ.eyJhenAiOiI4NjQ2OTU4NjY0ODYtdDdvajcybTRpdXQ1N3YwZ2V0aDNoYm5mNjRnMGEzY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4NjQ2OTU4NjY0ODYtdDdvajcybTRpdXQ1N3YwZ2V0aDNoYm5mNjRnMGEzY28uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDc1NjMzMTg3NTA4OTgyNjEyNzUiLCJlbWFpbCI6InBhdG5haWtzaGVraGFyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWWNRS3Q2QlpyYWFINDYzbzY1dE1mUSIsImlzcyI6ImFjY291bnRzLmdvb2dsZS5jb20iLCJpYXQiOjE1MTAzMjY1MjksImV4cCI6MTUxMDMzMDEyOX0.dCzSjD3MXCXMWhHV94T4dRwkR9Y53V2TJHIUtW31_9HD-g8ZeTn97aLonIWYBwcvO52dbXCivHrzkfIjivnSkaI7wBMgp3AMWJPvr1Pu-Fw8K4kzKLm-4eYB0JqXX2xJVfTx2RTvwBTnF98m2eAOWkcB3MZHsPi18sI82ILAV3JXpHf187KUfr3juenzuu45BSnJSXJxBYWGUKl5G6XQVEGwrZawxLMvEbqjIElHkK-W4oE88pHImc-ub6sPZB4-FN0GJPu88CiMeXrXTsq9L59zqQU-MnRzO8n0idTqab6HM8v-LeViyCoWLsJeaMuVHDMCtawtf5lQOSvilOlzfw',
      expires_in: 3588,
      token_type: 'Bearer'
    })
  })
}

describe('Google Auth', () => {
  
  const GoogleAuth = proxyguire('../../lib/googleauth', { 'request': requestStub })

  describe('getLoginURL', () => {
    it('should get the OAuth login URL', (done) => {
      expect(GoogleAuth.getLoginURL()).not.toBe(null)
      done()
    })
  })

  describe('getUserDetails', () => {
    it('should return an error if no code is passed', (done) => {
      GoogleAuth.getUserDetails(null, (err, email) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should call the google auth service if code is passed', (done) => {
      GoogleAuth.getUserDetails('123', (err, email) => {
        expect(err).toBe(null)
        expect(email).toBe('patnaikshekhar@gmail.com')
        done()
      })
    })
  })
})
