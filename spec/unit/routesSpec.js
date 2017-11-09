describe('routes', () => {
  
  const routes = require('../../lib/routes')
  
  describe('login', () => {
    it('should redirect to the google auth login url', (done) => {
      const res = {
        redirect: (location) => null
      }

      spyOn(res, 'redirect')
      
      routes.login({}, res)
      
      expect(res.redirect).toHaveBeenCalled()

      done()
    })
  })
})
