const http = require('http')

const PORT = 9527
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)
