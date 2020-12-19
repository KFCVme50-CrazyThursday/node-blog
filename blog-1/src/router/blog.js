const handleBlogRouter = (req, res) => {
  const method = req.method
  const path = req.path

  if (method === 'GET' && path === '/api/blog/list') {
    return {
      msg: 'blog list',
    }
  }

  if (method === 'GET' && path === '/api/blog/detail') {
    return {
      msg: 'blog detail',
    }
  }
  if (method === 'POST' && path === '/api/blog/new') {
    return {
      msg: 'blog new',
    }
  }
  if (method === 'POST' && path === '/api/blog/update') {
    return {
      msg: 'blog update',
    }
  }
  if (method === 'POST' && path === '/api/blog/del') {
    return {
      msg: 'blog del',
    }
  }
}

module.exports = handleBlogRouter
