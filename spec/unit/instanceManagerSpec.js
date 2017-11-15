const proxyquire = require('proxyquire')
const constants = require('../../lib/constants')

const dbStub = {
  query: (table, expr, filter, callback) => {
    callback(null, [{
      customerId: '1',
      instanceId: 'A'
    }, {
      customerId: '2',
      instanceId: 'B'
    }])
  },

  put: (table, doc, callback) => {
    console.log('Here in put')
    callback(null, {})
  }
}

const queueStub = {
  sendMessage: (queueName, message, callback) => {
    callback(null, {})
  }
}

const IM = proxyquire('../../lib/instanceManager', { 
  './db': dbStub,
  './queue': queueStub
})

describe('instancesManager', () => {
  describe('getInstances', () => {
    it('should return empty array if customer Id is empty', (done) => {
      IM.getInstances(null, (err, instances) => {
        expect(err).not.toBe(null)
        done()
      })
    })

    it('should return an array of instances when instances exist in db', (done) => {
      IM.getInstances('123', (err, instances) => {
        expect(err).toBe(null)
        expect(instances.length).toBe(2)
        done()
      })
    })
  })

  describe('createInstance', () => {
    it('should return an error if no customer Id is passed', (done) => {
      IM.createInstance(null, (err) => {
        expect(err).not.toBe(null)
        done()
      })
    })
    
    it('should create a record in the database with status of Creating', (done) => {
      
      spyOn(dbStub, 'put').andCallThrough()
      
      IM.createInstance('123', (err) => {
        expect(dbStub.put).toHaveBeenCalledWith(constants.INSTANCES_TABLE, jasmine.any(Object), jasmine.any(Function))
        expect(err).toBe(null)
        done()
      })
    })

    it('should place a message in the queue', (done) => {
      
      spyOn(queueStub, 'sendMessage').andCallThrough()

      IM.createInstance('123', (err) => {
        expect(queueStub.sendMessage).toHaveBeenCalledWith(
          constants.INSTANCE_CREATION_QUEUE, jasmine.any(String), 
          jasmine.any(Function))
        done()
      })
    })
  })
})
