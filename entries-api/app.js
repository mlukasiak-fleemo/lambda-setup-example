// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
'use strict'
const awsServerlessExpress = require('aws-serverless-express')
const routeConfig = require('./server.js')

const server = awsServerlessExpress.createServer(routeConfig, null, [])

exports.lambdaHandler = (event, context) => awsServerlessExpress.proxy(server, event, context)
