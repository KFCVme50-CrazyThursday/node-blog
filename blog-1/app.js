const querystring = require('querystring')
const { get, set } = require('./src/db/redis')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getCookieExpires = () => {
  const d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  return d.toGMTString()
}

// session 数据
// const SESSION_DATA = {}

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

  // 处理 path
  const url = req.url
  req.path = url.split('?')[0]

  // 解析参数
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {}
  console.log('req.headers.cookie', req.headers.cookie)
  const cookieStr = req.headers.cookie || '' // key1=v1;k2=v2
  cookieStr.split(';').forEach((item) => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  })

  // 解析session
  let needSetCookie = false
  let userId = req.cookie.userid
  /** 
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {}
    }
  } else {
    needSetCookie = true
    userId = `${+new Date()}_${Math.random()}`
    SESSION_DATA[userId] = {}
  }
  */
  if (!userId) {
    needSetCookie = true
    userId = `${+new Date()}_${Math.random()}`
    set(userId, {}) // 初始化 Redis 中的 session
  }
  // req.session = SESSION_DATA[userId]
  req.sessionId = userId // 获取session
  get(req.sessionId)
    .then((sessionData) => {
      if (sessionData == null) {
        set(req.sessionId, {})
        req.session = {}
      } else {
        req.session = sessionData
      }
      console.log('req.session ', req.session)
      // 处理post data
      return getPostData(req)
    })
    .then((postData) => {
      req.body = postData
      // 处理blog路由
      // const blogData = handleBlogRouter(req, res)
      // if (blogData) {
      //   res.end(JSON.stringify(blogData))
      //   return
      // }
      const blogResult = handleBlogRouter(req, res)
      if (blogResult) {
        blogResult.then((blogData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(blogData))
        })
        return
      }

      // const userData = handleUserRouter(req, res)
      // if (userData) {
      //   res.end(JSON.stringify(userData))
      //   return
      // }

      const userResult = handleUserRouter(req, res)
      if (userResult) {
        userResult.then((userData) => {
          if (needSetCookie) {
            res.setHeader(
              'Set-Cookie',
              `userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`
            )
          }
          res.end(JSON.stringify(userData))
        })
        return
      }

      res.writeHead(404, { 'content-type': 'text/plain' })
      res.write('404 not found\n')
      res.end()
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = serverHandle
