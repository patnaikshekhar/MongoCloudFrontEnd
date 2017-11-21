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
          if (err) {
            callback(err)
          } else {
            cloudformation.waitFor('stackCreateComplete', { StackName: name }, (err, data) => {
              callback(err, data[0].Outputs)
            })
          }
        })
      }
    })
  } else {
    callback('Name and template are required')
  }
}

const deleteStack = (name, callback) => {
  if (name) {
    const params = {
      StackName: name
    }

    cloudformation.deleteStack(params, (err, data) => {
      if (err) {
        callback(err)
      } else {
        cloudformation.waitFor('stackDeleteComplete', params, (err, data) => {
          callback(null)
        })
      }
    })
  } else {
    callback('Name is required')
  }
}

module.exports = {
  createStack,
  deleteStack
}
