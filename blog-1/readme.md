# readme

## 操作过程

1. 安装 mysql ，建表
2. 安装 Redis 并启动
3. 启动 node 服务， `cd blog-1` `npm run dev`
4. 启动测试文件 `http-server -p 8001`
5. 浏览器打开 `localhost:8080`

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

## redis 链接

```javascript
// redis 链接
const redis = require('redis)

// 创建客户端
const redisClient = redis.createClient(6379,'127.0.0.1')
redisClient.on('error', err=>{
  console.error(err)
})

redisClient.set('myname','sq',redis.print)
redisClient.get('myname',(err,val)=>{
  if(err) {
    console.error(err)
    return
  }
  console.log('val is', val)
  redisClient.quit()
})

```

## nginx 配置

- /usr/local/etc/nginx/nginx.conf

```nginx
server {
  listen       8080; // nginx 代理地址
  server_name  localhost;
  location / {
      proxy_pass http://localhost:8001;  // 本地服务地址
  }
  location /api/ {
      proxy_pass http://localhost:8000;  // node 服务地址
      proxy_set_header Host $host;
  }
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
}
```

常用命令

- 测试配置文件格式是否正确 `nginx -t`
- 启动： `nginx` 重启 `nginx -s reload`
- 停止 `nginx -s stop`

## 测试文件

- 新增各个接口页面测试文件
- 全局安装 http-server `npm i http-server -g`
- 启动本地服务 `http-server -p 8001`

## 日志拆分

- copy.sh 脚本
  cd 到 utils
  sh copy.sh
  日志按天划分 access 复制到 日期划分的日志下 ，清空 access
  `pwd` 查看当前文件路径

  使用 [crontab](https://www.runoob.com/linux/linux-comm-crontab.html) 定期执行程序日志清空复制
  crontab -e 添加一个定时任务
  crontab -l 查看当前有多少定时任务
  `1 * 0 * * * sh /Users/sy/Desktop/node-blog/blog-1/src/utils/copy.sh`
