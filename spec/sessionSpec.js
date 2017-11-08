const mock = require('mock-require')

describe('Session Manager', () => {
  
  const SM = require('../session')
  mockDBHelper()

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
        redirect(location) {
          
        }
      }
      
      spyOn(res, 'redirect')
      SM.checkSession({}, res, () => {})
      expect(res.redirect).toHaveBeenCalledWith('/login')
    })
  })
})

const mockDBHelper = () => {
  mock('../db', {
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
  })
}
