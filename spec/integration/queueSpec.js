const queue = require('../../lib/queue')
const TEST_QUEUE = require('../../lib/constants').TEST_QUEUE
const uuid = require('uuid')

describe('queue', () => {
  describe('sendMessage', () => {
    it('should send a message to a queue', (done) => {
      queue.sendMessage(TEST_QUEUE, 'Test', (err, msgId) => {
        expect(err).toBe(null)
        done()
      })
    })
  })

  describe('receiveMessage', () => {
    it('should receive a message from the queue', (done) => {
      const message = `TEST-${uuid.v1()}`
      queue.sendMessage(TEST_QUEUE, message, (err) => {
        queue.receiveMessage(TEST_QUEUE, (err, msgs) => {
          expect(err).toBe(null)
          expect(msgs.length).not.toBe(0)
          msgs.forEach((msg) => msg.done())
          done()
        })
      })
    })
  })
})
