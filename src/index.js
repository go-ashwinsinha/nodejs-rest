require('dotenv').config()
const config = require('./config')
const server = require('./server')
const { logger } = require('./utils/logger')

server.listen(process.env.NODE_PORT || config.port, () => {
  logger.info(`Server started on port ${server.address().port}`)
})
