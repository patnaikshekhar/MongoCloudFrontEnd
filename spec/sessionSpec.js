const mock = require('mock-require')

const mockDBHelper = () => {
  return {
    get: (table, key, callback) => {
      if (key == '456') {
        callback({
          sessionId: key,
          sessionStart: Date.now(),
          customerId: 'test@test.com'
        })
      } else if (key == '789') {
        callback({
          sessionId: key,
          sessionStart: Date.now() - 370000,
          customerId: 'test@test.com'
        })
      } else {
        callback(null)
      }
    }
  }
}

describe('Session Manager', () => {
  
  mock('../db', mockDBHelper())
  const SM = require('../session')

  describe('checkValidSession', () => {
    
    it('should return false when session does not exist in db', (done) => {
      SM.checkValidSession('123', (value) => {
        expect(value).toBe(false)
        done()
      })
    })

    it('should return true when session exists in db and is valid', (done) => {
      SM.checkValidSession('456', (value) => {
        expect(value).toBe(true)
        done()
      })
    })

    it('should return true when session exists in db and is invalid', (done) => {
      SM.checkValidSession('789', (value) => {
        expect(value).toBe(false)
        done()
      })
    })
  })

  describe('checkSession', () => {
    it('should return login page if no cookie is passed', () => {
      const res = {
        redirect(location) {}
      }
      
      spyOn(res, 'redirect')
      SM.checkSession({}, res, () => {})
      expect(res.redirect).toHaveBeenCalledWith('/login')
    })

    it('should execute the next function if valid cookie is passed and add customer id to request', (done) => {
      var req = { cookies: { sessionId: '456' } }

      SM.checkSession(req, {}, () => {
        expect(req.customerId).toBe('test@test.com')
        done()
      })
    })
    
    it('should return login page if cookie is passed with incorrect session', (done) => {
      const res = {
        redirect(location) {}
      }
      
      spyOn(res, 'redirect')
      var req = { cookies: { sessionId: '123' } }

      SM.checkSession(req, res, () => {})
      expect(res.redirect).toHaveBeenCalledWith('/login')
      done()
    })
  })
})
