const uuid = require('uuid')
const db = require('./db')
const queue = require('./queue')

const CONSTANTS = require('./constants')
const INSTANCES_TABLE = CONSTANTS.INSTANCES_TABLE
const IN_QUEUE_STATUS = CONSTANTS.IN_QUEUE_STATUS
const INSTANCE_CREATION_QUEUE = CONSTANTS.INSTANCE_CREATION_QUEUE

/**
 * Get a list of instances for a customer.
 * @param {string} customerId of customer
 * @param {Object} callback with list of instances
 */
const getInstances = (customerId, callback) => {
  if (customerId) {
    const expr = 'customerId = :customerId'
    const filters = { ':customerId': customerId }
    
    db.query(INSTANCES_TABLE, expr, filters, (err, data) => {
      callback(err, data)
    })

  } else {
    callback('No customer Id passed')
  }
}

/**
 * Sends a message to the queue to create an instance.
 * @param {string} customerId of customer
 * @param {Object} callback when message has been sent
 */
const createInstance = (customerId, callback) => {
  if (customerId) {
    const instance = {
      customerId,
      instanceId: `INS-${uuid.v1()}`,
      status: IN_QUEUE_STATUS 
    }
    
    db.put(INSTANCES_TABLE, instance, (err, data) => {
      if (err) {
        callback(err)
      } else {
        console.log('Sending to queue')
        queue.sendMessage(INSTANCE_CREATION_QUEUE, 
                          JSON.stringify(instance), (err) => {
          callback(err)
        })
      }
    })
  } else {
    callback('No customer Id passed')
  }
}

module.exports = {
  getInstances,
  createInstance
}
