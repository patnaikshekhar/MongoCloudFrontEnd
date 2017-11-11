const AWS = require('aws-sdk')
const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: require('../config.json').Region
})

const get = (table, keyname, key, callback) => {
  var params = {
    TableName: table,
    Key: {}
  }
  
  params.Key[keyname] = key
  
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

const del = (table, keyname, key, callback) => {
  var params = {
    TableName: table,
    Key: {}
  }

  params.Key[keyname] = key
  
  dynamoDB.delete(params, callback)
}

module.exports = {
  get,
  put,
  delete: del
}
