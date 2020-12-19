const getList = (author, keyword) => {
  return [
    {
      id: 1,
      title: '标题11111',
      content: '内容1111',
      createTime: 1608367440598,
      author: 'ax',
    },
    {
      id: 2,
      title: '标题22222222',
      content: '内容22222222222',
      createTime: 1609367440598,
      author: 'sq',
    },
  ]
}

const getDetail = (id) => {
  return {
    id: 1,
    title: '标题11111',
    content: '内容1111',
    createTime: 1608367440598,
    author: 'ax',
  }
}

const newBlog = (blogData = {}) => {
  console.log('blogData.....', blogData)
  return {
    id: 1,
  }
}

const updateBlog = (id, blogData = {}) => {
  // id: blog id blogData: blog content
  console.log('====== updateBlog =====', id, blogData)
  return true
}

const delBlog = (id) => {
  console.log('=== delete blog ===', `this blog's id is ${id}`)
  return true
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}
