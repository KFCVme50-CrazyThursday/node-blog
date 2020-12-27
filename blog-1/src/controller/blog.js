const { exec, escape } = require('../db/mysql')
const xss = require('xss')

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
  let { title, content, author, createtime = +new Date() } = blogData
  title = escape(xss(title))
  content = escape(xss(content))
  author = escape(author)
  createtime = escape(createtime)
  const sql = `
    insert into blogs (title,content,author,createtime) 
    values (${title},${content},${author},${createtime})
  `
  return exec(sql).then((insert) => {
    return {
      id: insert.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  let { title, content } = blogData
  title = escape(title)
  content = escape(content)
  const sql = `
    update blogs set title=${title}, content=${content} where id=${id}
  `
  return exec(sql).then((update) => {
    if (update.affectedRows > 0) {
      return true
    }
    return false
  })
}

const delBlog = (id, author) => {
  id = escape(id)
  author = escape(author)
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
