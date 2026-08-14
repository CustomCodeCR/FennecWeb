const http = require('http')
const mockserver = require('mockserver')

http
  .createServer(mockserver('./mocks'))
  .listen(9001, () => {
    console.log('Mock API running at http://localhost:9001')
  })