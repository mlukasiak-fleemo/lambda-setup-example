const AWS = require('aws-sdk');
const uuid = require('uuid');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

class EntriesService {
    constructor() {
        this.params = {
            TableName: process.env.TABLE_NAME
        }
        const x = {prop1: 1, prop2: 2}
        const y = {...x, prop2: 3}
    }

    getEntries(res) {
        const params = {
            ...this.params,
            KeyConditionExpression: "EntityType = :type",
            ExpressionAttributeValues: {
                ":type": "Entry"
            }
        }
        console.log('Query', params)
        dynamoDb.query(params, (error, result) => {
            if (error) {
                res.status(400).json({ error: 'Error fetching the entries', source: error });
            } else {
                console.log("Loaded", result)
                res.json({entries: result.Items});
            }
        });
    }

    addEntry(res, req) {
        const entryData = req.body;
        console.log("Received: ", entryData);
        const itemId = uuid.v4()
        const item = {
            EntityType: 'Entry',
            EntityId: itemId,
            ...entryData
        };
        console.log('Storing item:', item)
        const params = {...this.params, Item: item};
        dynamoDb.put(params, (error, data) => {
            if (error) {
                res.status(400).json({ error: 'Could not create Entry', info: error });
            } else {
                res.json(item);
            }
        });

    }
}

module.exports = EntriesService