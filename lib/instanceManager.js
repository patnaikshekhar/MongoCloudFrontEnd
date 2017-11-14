const uuid = require('uuid')
const db = require('./db')

const INSTANCES_TABLE = require('./constants').INSTANCES_TABLE
const CREATING_STATUS = require('./constants').CREATING_STATUS

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

const createInstance = (customerId, callback) => {
  if (customerId) {
    const instance = {
      customerId,
      instanceId: `INS-${uuid.v1()}`,
      status: CREATING_STATUS 
    }
    console.log(db.put)
    db.put(INSTANCES_TABLE, instance, (err, data) => {
      callback(err)
    })
  } else {
    callback('No customer Id passed')
  }
}

module.exports = {
  getInstances,
  createInstance
}
