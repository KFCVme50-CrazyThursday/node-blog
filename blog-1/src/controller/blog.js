const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title='${keyword}' `
  }
  sql += `order by createtime desc;`

  return exec(sql)
}

const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((rows) => {
    return rows[0]
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author, createtime = +new Date() } = blogData
  const sql = `
    insert into blogs (title,content,author,createtime) 
    values ('${title}','${content}','${author}','${createtime}')
  `
  return exec(sql).then((insert) => {
    return {
      id: insert.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  const { title, content } = blogData
  const sql = `
    update blogs set title='${title}', content='${content}' where id=${id}
  `
  return exec(sql).then((update) => {
    if (update.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'` // 不使用软删除

  return exec(sql).then((del) => {
    if (del.affectedRows > 0) {
      return true
    }
    return false
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog,
}
