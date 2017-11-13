const proxyquire = require('proxyquire')

const googleauthStub = {
  getLoginURL: () => 'TestURL',

  getUserDetails: (token, callback) => {
    if (token == '123') {
      callback('Invalid token', null)
    } else if (token == '456') {
      callback(null, 'test@error.com')
    } else if (token == '789') {
      callback(null, 'test@test.com')
    }
  }
}

const sessionStub = {
  createSession: (customerId, res, callback) => {
    if (customerId == 'test@error.com') {
      callback('Error')
    } else {
      callback(null)
    }
  }
}

const instanceStub = {
  getInstances: (customerId, callback) => callback(null, [{
    instanceId: '1'
  }, {
    instanceId: '2'
  }])
}

describe('routes', () => {
  
  const routes = proxyquire('../../lib/routes', {
    './googleauth': googleauthStub,
    './session': sessionStub,
    './instanceManager': instanceStub
  })
  
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

  describe('googleauthcallback', () => {
    const res = {
      end: (value) => {},
      redirect: (location) => {}
    }
    it('should respond with an error page when no user details are returned', (done) => {
      
      
      spyOn(res, 'end')
      routes.googleauthcallback({ query: { code: '123' } }, res)
      
      expect(res.end).toHaveBeenCalled()
      done()
    })
    
    it('should respond with an error page if create session fails', (done) => {
      spyOn(res, 'end')
      routes.googleauthcallback({ query: { code: '456' } }, res)
      expect(res.end).toHaveBeenCalled()
      done()
    })

    it('should redirect once auth is completed', (done) => {
      spyOn(res, 'redirect')
      routes.googleauthcallback({ query: { code: '789' } }, res)
      expect(res.redirect).toHaveBeenCalledWith('/')
      done()
    })
  })

  describe('getInstances', () => {
    const res = {
      json: (value) => {},
      end: (value) => {}
    }
    
    it('should return an error if no customer id is passed', (done) => {
      var req = {}
      spyOn(res, 'end')
      routes.getInstances(req, res)
      expect(res.end).toHaveBeenCalled()
      done()
    })

    it('should return a list of instances', (done) => {
      spyOn(res, 'json')
      var req = { customerId: '123' }
      routes.getInstances(req, res)
      expect(res.json).toHaveBeenCalled()
      done()
    })
  })
})
