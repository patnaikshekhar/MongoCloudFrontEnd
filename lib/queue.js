const AWS = require('aws-sdk')
const sqs = new AWS.SQS({
  region: require('../config.json').Region
})


const sendMessage = (queueName, message, callback) => {
  const params = {
    MessageBody: message,
    QueueUrl: queueName
  }

  sqs.sendMessage(params, (err, data) => {
    callback(err, data)
  })
}

const receiveMessage = (queueName, callback) => {
  const params = {
    QueueUrl: queueName,
    MaxNumberOfMessages: 10
  }

  sqs.receiveMessage(params, (err, messages) => {
    callback(err, messages.Messages.map((message) => ({
      done: () => {
        const params = {
          QueueUrl: queueName,
          ReceiptHandle: message.ReceiptHandle
        }

        sqs.deleteMessage(params, (err) => {
          if (err)
            console.log(err)
        })
      },
      message: message.Body
    })))
  })
}

module.exports = {
  sendMessage,
  receiveMessage
}
