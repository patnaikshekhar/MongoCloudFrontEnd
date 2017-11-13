const proxyquire = require('proxyquire')

const dbStub = {
  query: (table, expr, filter, callback) => {
    callback(null, [{
      customerId: '1',
      instanceId: 'A'
    }, {
      customerId: '2',
      instanceId: 'B'
    }])
  }
}

const IM = proxyquire('../../lib/instanceManager', { './db': dbStub })

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
})
