const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

class PersistenceService {
    constructor() {
        this.params = {
            TableName: process.env.TABLE_NAME
        }
    }

    fetchByEntityType(entityType, onSuccess, onError) {
        const params = {
            ...this.params,
            KeyConditionExpression: "EntityType = :type",
            ExpressionAttributeValues: {
                ":type": entityType
            }
        }
        dynamoDb.query(params, (error, result) => {
            error ? onError(error) : onSuccess(result.Items)
        });
    }

    putItem(item, onSuccess, onError) {
        dynamoDb.put({...this.params, Item: item}, (error, data) => {
            error ? onError(error) : onSuccess(data)
        })
    }

    deleteItem(itemId, onSuccess, onError) {
        dynamoDb.delete({...this.params, Key: {EntityType: {S: 'Entry'}, EntityId: {S: itemId}}}, (error, data) => {
            error ? onError(error) : onSuccess(data)
        })
    }
}

module.exports = new PersistenceService()