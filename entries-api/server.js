const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const entriesService = require('./entries-service')

const server = express()
const router = express.Router()

router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(awsServerlessExpressMiddleware.eventContext())

router.get('/entries/', (req, res) => {
    entriesService.getEntries(res)
})

router.post('/entries', (req, res) => {
    entriesService.addEntry(res, req)
})

router.put('/entries/:id', (req, res) => {
    entriesService.updateEntry(res, req.params.id)
})

server.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = server
