const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]
  if (method === 'POST' && path === '/api/blog/login') {
    return {
      msg: 'blog login',
    }
  }
}
module.exports = handleUserRouter
