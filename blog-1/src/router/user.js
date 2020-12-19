const handleUserRouter = (req, res) => {
  const method = req.method
  const path = req.path
  if (method === 'POST' && path === '/api/blog/login') {
    return {
      msg: 'blog login',
    }
  }
}
module.exports = handleUserRouter
