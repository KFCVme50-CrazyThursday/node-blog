const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { reset } = require('nodemon')

const serverHandle = (req, res) => {
  res.setHeader('content-type', 'application/json')
  // const resData = {
  //   name: 'sq',
  //   age: 18,
  //   env: process.env.NODE_ENV,
  // }
  // res.end(JSON.stringify(resData))

  const blogData = handleBlogRouter(req, res)
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }

  const userData = handleUserRouter(req, res)
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }

  res.writeHead(404, { 'content-type': 'text/plain' })
  res.write('404 not found\n')
  res.end()
}

module.exports = serverHandle
