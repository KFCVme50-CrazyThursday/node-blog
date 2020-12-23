const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path
  if (method === 'GET' && path === '/api/user/login') {
    // const { username, password } = req.body
    const { username, password } = req.query

    const result = login(username, password)

    return result.then((data) => {
      if (data.username) {
        // 操作cookie
        // res.setHeader(
        //   'Set-Cookie',
        //   `username=${
        //     data.username
        //   };password=${123};path=/;httpOnly;expires=${getCookieExpires()}`
        // )
        // 设置session
        req.session.username = data.username
        req.session.realname = data.realname
        
        console.log('req.session is', req.session)

        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
  }
  // 登录验证测试
  if (method === 'GET' && req.path === '/api/user/login-test') {
    if (req.session.username) {
      return Promise.resolve(
        new SuccessModel({
          username: req.session.username,
          realname: req.session.realname,
          session: req.session,
        })
      )
    }
    return Promise.resolve(new ErrorModel('登录失败'))
  }
}
module.exports = handleUserRouter
