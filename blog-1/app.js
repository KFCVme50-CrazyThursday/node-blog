const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

// 处理 post data
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', (chunk) => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(JSON.parse(postData))
    })
  })
}

const serverHandle = (req, res) => {
  res.setHeader('content-type', 'application/json')
  // env: process.env.NODE_ENV,

  // 处理 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析参数
  req.query = querystring.parse(url.split('?')[1])

  getPostData(req).then((postData) => {
    req.body = postData
    // console.log('req.body...', req.body)
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
  })
}

module.exports = serverHandle
