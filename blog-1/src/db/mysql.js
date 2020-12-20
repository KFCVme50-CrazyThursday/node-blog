const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db.js')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

con.connect() // 开始链接

// 统一执行 sql 函数
function exec(sql) {
  console.log('sql', sql)
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
}

module.exports = {
  exec,
}
