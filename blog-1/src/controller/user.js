const login = (username, password) => {
  if (username === 'ax' && password === '18') {
    return true
  }
  return false
}
module.exports = {
  login,
}
