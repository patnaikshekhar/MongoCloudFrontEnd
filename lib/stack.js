const AWS = require('aws-sdk')
const cloudformation = new AWS.CloudFormation()

const createStack = (name, template, callback) => {
  if (name && template) {
    callback('Not implemented')
  } else {
    callback('Name and template are required')
  }
}

const deleteStack = (name, callback) => {
  callback('Not implemented')
}

module.exports = {
  createStack,
  deleteStack
}
