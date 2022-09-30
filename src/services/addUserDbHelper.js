const localCache = require('../utils/localCache');
const { saveItemToDB } = require('./dynamoDbHelper');
const { logger } = require('../utils/logger')
const config = require('../config')


const addUserToDb = async (userId, body) => {
	try {
		const saveItemResponse = await saveItemToDB(userId, body, 'userDetails')
		return saveItemResponse
	} catch (e) {
		logger.error(e)
		throw new Error('Error while trying to addUserToDb ' + e)
	}
}


module.exports = {
	sliceCreationParamMapping,
	sliceCreationCsmfRequest
}