## mysql 常用语句

```JavaScript
use myblog;
show tables; -- 显示数据库表

insert into users (username,`password`,realname) values('zhangsan','123','王二'); -- 插入

select * from users; -- 查询全部
select * from users where username="zhagnsan" or `password`='123';
select * from users where username="zhagnsan" and `password`='123';
select * from users where username like "%san%";
select * from users where password like '%1%' order by id desc;
select id,username from users; -- 查询返回信息只带 id username

-- 安全模式
SET SQL_SAFE_UPDATES = 0;
update users set username='zhangsan2' where username='zhangsan1';

delete from users where username='zhangsan2';

select * from users where state=1;
update users set state=0 where username='lisi';-- 软删除
select * from users where state=0;


show tables;
select * from users;
select * from blogs;
select version();
insert into blogs (title,content,createtime,author) values('标题D','内容D',1608455192493,'zhangsan');


```

## mysql 链接

```javascript
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sj123456',
  port: 3306,
  database: 'myblog',
})

// 开始连接
con.connect()

// 执行sql查询
const sql = 'select * from blogs where author="zhangsan"'
const update = 'update users set realname="李四" where username="lisi"'
con.query(sql, (err, result) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('result:', result)
})

// 关闭连接
con.end()
```
