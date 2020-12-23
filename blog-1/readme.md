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
      listen       8080;
      server_name  localhost;

      #charset koi8-r;

      #access_log  logs/host.access.log  main;

      # location / {
      #     root   html;
      #     index  index.html index.htm;
      # }

      location / {
          proxy_pass http://localhost:8001;
      }
      location /api/ {
          proxy_pass http://localhost:8000;
          proxy_set_header Host $host;
      }

      #error_page  404              /404.html;

      # redirect server error pages to the static page /50x.html
      #
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }

      # proxy the PHP scripts to Apache listening on 127.0.0.1:80
      #
      #location ~ \.php$ {
      #    proxy_pass   http://127.0.0.1;
      #}

      # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
      #
      #location ~ \.php$ {
      #    root           html;
      #    fastcgi_pass   127.0.0.1:9000;
      #    fastcgi_index  index.php;
      #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
      #    include        fastcgi_params;
      #}

      # deny access to .htaccess files, if Apache's document root
      # concurs with nginx's one
      #
      #location ~ /\.ht {
      #    deny  all;
      #}
  }
```

常用命令

- 测试配置文件格式是否正确 `nginx -t`
- 启动： `nginx` 重启 `nginx -s reload`
- 停止 `nginx -s stop`
