const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: require('../config.json').Region
})

const get = (table, key, callback) => {
  var params = {
    TableName: table,
    Key: key
  }
  
  dynamoDB.get(params, (err, data) => {
    if (err) {
      callback(err, null)
    } else {
      if (Object.keys(data).length > 0) {
        callback(null, data.Item)
      } else {
        callback(null, null)
      }
    }
  })
}

const put = (table, doc, callback) => {
  const params = {
    TableName: table,
    Item: doc
  }
  
  dynamoDB.put(params, (err, data) => {
    callback(err, data)
  })
}

const del = (table, key, callback) => {
  var params = {
    TableName: table,
    Key: key
  }
  
  dynamoDB.delete(params, callback)
}

const query = (table, filterExpression, expressionValues, callback) => {
  const params = {
    TableName: table,
    KeyConditionExpression: filterExpression,
    ExpressionAttributeValues: expressionValues
  }

  dynamoDB.query(params, (err, data) => {
    if (err) {
      callback(err)
    } else {
      callback(null, data.Items)
    }
  })
}

module.exports = {
  get,
  put,
  delete: del,
  query
}
