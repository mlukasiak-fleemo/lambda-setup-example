const uuid = require('uuid');
const persistenceService = require('./persistance-service')

class EntriesService {
    getEntries(res) {
        console.log('Fetching entries')
        persistenceService.fetchByEntityType('Entry',
            (items) => res.json({entries: items}),
            (error) => res.status(400).json({error: 'Error fetching the entries', source: error})
        )
    }

    createItemObject(itemId, itemData) {
        return {
            EntityType: 'Entry',
            EntityId: itemId,
            ...itemData
        }
    }

    addEntry(res, req) {
        const item = this.createItemObject(uuid.v4(), req.body)
        console.log('Storing item:', item)
        persistenceService.putItem(item,
            (item) => res.json(item),
            (error) => res.status(400).json({error: 'Could not create Entry', source: error}))
    }

    updateEntry(res, entryId) {
        const entryData = req.body;
        const item = this.createItemObject(entryData.EntityId, entryData)
        console.log('Updating item:', item)
       persistenceService.putItem(item,
           (item) => res.json(item),
           (error) => res.status(400).json({error: 'Could not update Entry', source: error}))
    }

    deleteEntry(res, entryId) {
        console.log('Deleting item id:', entryId)
        persistenceService.deleteItem(entryId,
            (item) => res.json(item),
            (error) => res.status(400).json({error: 'Could not delete Entry', source: error}))
    }

}

module.exports = new EntriesService()