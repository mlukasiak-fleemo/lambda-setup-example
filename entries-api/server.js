const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const EntriesService = require('./entries-service')

const server = express()
const router = express.Router()

router.use(compression())
router.use(cors())
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: true}))
router.use(awsServerlessExpressMiddleware.eventContext())

const service = new EntriesService()
router.get('/entries/', (req, res) => {
    service.getEntries(res)
})

router.post('/entries', (req, res) => {
    service.addEntry(res, req)
})

server.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = server
