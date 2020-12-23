const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

// 登录验证
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('尚未登录'))
  }
}

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  const id = req.query.id

  if (method === 'GET' && path === '/api/blog/list') {
    const { author = '', keyword = '' } = req.query
    const result = getList(author, keyword)
    return result.then((listData) => {
      return new SuccessModel(listData)
    })
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }
  if (method === 'POST' && path === '/api/blog/new') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }
  if (method === 'POST' && path === '/api/blog/update') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }

    const result = updateBlog(id, req.body)
    return result.then((val) => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('update blog failed')
      }
    })
  }
  if (method === 'POST' && path === '/api/blog/del') {
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 未登录
      return loginCheckResult
    }
    const author = req.session.username
    const result = delBlog(id, author)
    return result.then((result) => {
      if (result) {
        return new SuccessModel()
      } else {
        return new ErrorModel('del blog failed')
      }
    })
  }
}

module.exports = handleBlogRouter
