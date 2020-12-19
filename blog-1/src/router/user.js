const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body
    const loginStatus = login(username, password)
    if (loginStatus) {
      return new SuccessModel()
    } else {
      return new ErrorModel('login failed')
    }
  }
}
module.exports = handleUserRouter
