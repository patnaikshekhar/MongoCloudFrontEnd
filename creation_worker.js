/**
Worker polls the creation queue and calls the
cloudformation API to create an instance
**/

const queue = require('./lib/queue')
const CONSTANTS = require('./constants')
const instanceManager = require('./instanceManager')

queue.recieveMessage(CONSTANTS.INSTANCE_CREATION_QUEUE, (err, messages) => {
  messages.forEach((message) => {
    var instance = JSON.parse(message.message)
    instanceManager.createStack(instance.instanceId, (err) => {
      if (err) {
        console.error(err)
      } else {
        // Once instance in queue. Update status
        instance.status = CONSTANTS.CREATING_STATUS

        db.put(CONSTANTS.INSTANCES_TABLE, instance, (err, data) => {
          // TODO: Put into monitoring queue
          // Design TBD
        })
      }
    })
  })
})
