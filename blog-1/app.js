const serverHandle = (req, res) => {
  res.setHeader('content-type', 'application/json')
  const resData = {
    name: 'sq',
    age: 18,
    env: process.env.NODE_ENV,
  }
  res.end(JSON.stringify(resData))
}

module.exports = serverHandle
