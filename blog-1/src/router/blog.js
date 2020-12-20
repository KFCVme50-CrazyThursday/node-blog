const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path
  const id = req.query.id

  console.log('get path', method, path)

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
    const au = 'zhangsan'
    req.body.author = au

    const result = newBlog(req.body)
    return result.then((data) => {
      return new SuccessModel(data)
    })
  }
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('update blog failed')
    }
  }
  if (method === 'POST' && path === '/api/blog/del') {
    const result = delBlog(id)
    if (result) {
      return new SuccessModel()
    } else {
      return new ErrorModel('del blog failed')
    }
  }
}

module.exports = handleBlogRouter
