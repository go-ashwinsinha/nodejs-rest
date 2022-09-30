const AWS = require('aws-sdk')

const { logger } = require('../utils/logger')

const config = require('../config')

AWS.config.update({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
    region: config.awsDynRegion
});
const dynamo = new AWS.DynamoDB.DocumentClient()



/**
 **!!!!!!!!!!!!!!!! TO DO UPDATE!!!!!!!!!!!!!!!!!!!!
 * @param {*} params DB save paramtner
 * @param {*} [ddbClient] DynamoDB client
 * @returns DB save response
 */

const saveItem = async (params, ddbClient = dynamo) => {
    logger.info('DB Save called', params)
    const respones = await ddbClient.put(params).promise()

    return respones
}

/**
 **!!!!!!!!!!!!!!!! TO DO UPDATE!!!!!!!!!!!!!!!!!!!!
 * @param {*} params DB read paramtner
 * @param {*} [ddbClient] DynamoDB client
 * @returns DB read response
 */
const readItem = async (params, ddbClient = dynamo) => {
    logger.info('DB Read called', params)
    const data = await ddbClient.get(params).promise()
    if (Object.keys(data).length != 0) {
        return (data.Item.serviceProfileId)
    } else {
        return null
    }
}

/**
 *!!!!!!!!!!!!!!!! TO DO UPDATE!!!!!!!!!!!!!!!!!!!!
 * Function to transform and save data received in payload.
 * @param {object} eventData
 * @param {string} dbName which db to refer to whether ratePlan or deviceDetails
 * @returns  DB save status
 */
const saveItemToDB = async (userIdParam, body, dbName) => {
    var dataToSave = {}
    logger.info(nsiIdParam + " " + serviceProfileIdParam)
    var tableName;
    tableName = dbName
    dataToSave = {
        userId: userIdParam,
        name: body.name,
        passowrd: body.password,
        profession: body.profession
    }

    const params = {
        TableName: tableName,
        Item: dataToSave
    }
    return saveItem(params)
}





/**
 * *!!!!!!!!!!!!!!!! TO DO UPDATE!!!!!!!!!!!!!!!!!!!!
 * Function to read data identified by unique key and dbName.
 * @param {object} key this is unqiue identifier for the record to be read from dynamo
 * @param {string} dbName which db to refer to whether ratePlan or deviceDetails
 * @returns  DB read status
 */
const readItemFromDB = async (key, dbName) => {
    var tableName;
    var params = {};

    
    tableName = config.cacheServiceProfileId
    params.Key = { nsiId: key };
    
    params.TableName = tableName;
    return readItem(params)
}




module.exports = {
    saveItemToDB,
    readItemFromDB
}
