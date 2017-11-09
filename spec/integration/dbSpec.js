describe('DB', () => {
  
  const db = require('../../lib/db')
  const sessionsTable = require('../../lib/constants').SESSION_TABLE

  describe('put', () => {
    it('should put nothing when document is incorrect', (done) => {
      db.put(sessionsTable, {}, (err, value) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should put values when document is correct', (done) => {
      db.put(sessionsTable, { sessionId: '1234', customerId: 'test@test.com' }, (err, value) => {
        db.delete(sessionsTable, 'sessionId', '1234', (err, value) => {
          expect(err).toBe(null)
          done()
        })
      })
    })
  })
  
  describe('delete', () => {
    it('should return nothing when key does not exist', (done) => {
      db.delete(sessionsTable, 'sessionId', '567_Random', (err, value) => {
        expect(Object.keys(value).length).toBe(0)
        done()
      })
    })

    it('should delete values when key exists', (done) => {
      db.put(sessionsTable, { sessionId: '567' }, (err, value) => {
        db.delete(sessionsTable, 'sessionId', '567', (err, value) => {
          expect(err).toBe(null)
          db.get(sessionsTable, 'sessionId', '567', (err, value) => {
            expect(value).toBe(null)
            done()
          })
        })
      })
    })
  })

  describe('get', () => {
    it('should get nothing from db when values dont exist', (done) => {
      db.get(sessionsTable, 'sessionId', '123', (err, value) => {
        expect(err).toBe(null)
        expect(value).toBe(null)
        done()
      })
    })
    
    it('should get nothing from db when query is incorrect', (done) => {
      db.get(sessionsTable, 'wrongKey', '123', (err, value) => {
        expect(err).not.toBe(null)
        expect(value).toBe(null)
        done()
      })
    })

    it('should get a value from db when it exists', (done) => {
      db.put(sessionsTable, { sessionId: '123' }, (err, value) => {
        db.get(sessionsTable, 'sessionId', '123', (err, value) => {
          expect(value).not.toBe(null)
          db.delete(sessionsTable, 'sessionId', '123', (err, value) => {
            done()
          })
        })
      })
    })
  })
})
