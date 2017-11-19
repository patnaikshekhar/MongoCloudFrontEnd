const AWS = require('aws-sdk')
const config = require('../config.json')
const cloudformation = new AWS.CloudFormation({
  region: config.Region
})
const fs = require('fs')

const createStack = (name, template, callback) => {
  if (name && template) {
    fs.readFile(template, (err, data) => {
      if (err) {
        callback(err)
      } else {
        const params = {
          StackName: name,
          TemplateBody: data.toString()
        }
        
        cloudformation.createStack(params, (err, data) => {
          console.log(data)
          callback(err, data)
        })
      }
    })
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
