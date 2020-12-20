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
    console.log('insert data is', insert)
    return {
      id: insert.insertId,
    }
  })
}

const updateBlog = (id, blogData = {}) => {
  // id: blog id blogData: blog content
  console.log('====== updateBlog =====', id, blogData)
  return true
}

const delBlog = (id) => {
  console.log('=== delete blog ===', `this blog's id is ${id}`)
  const sql = `delete from blogs where id=${id}`

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
