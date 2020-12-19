# 使用原生 nodejs express koa 创建一个博客后台

## 接口列表

| 描述     | 接口               | 方法 | url 参数                    | 备注 |
| -------- | ------------------ | ---- | --------------------------- | ---- |
| 博客列表 | `/api/blog/list`   | get  | author 作者，keyword 关键字 |
| 详情     | `/api/blog/detail` | get  | id                          |
| 新增     | `/api/blog/new`    | post | 新增的信息                  |
| 更新     | `/api/blog/update` | post | id 更新的内容               |
| 删除     | `/api/blog/del`    | post | id                          |
| 登录     | `/api/blog/login`  | post | 登录信息                    |
