# Nginx

> 参考：https://nginx.org/en/docs/
> 上次更新：2023-3-1

## 变量

`$http_...` 请求头

`$host` 主机名：请求行中的主机名，或请求头中的Host，或server_name

`$proxy_host` proxy_pass代理到的服务器的主机名和端口号

`$proxy_port` proxy_pass代理到的服务器的端口号

`$remote_addr` 客户端地址

`$proxy_add_x_forwarded_for` 请求头中的X-Forwarded-For加上客户端地址

`$server_port` 本服务器端口号

## 反向代理

```
proxy_pass ...;
# 以下内容可以写在单独文件中并include
proxy_set_header Host $host; # 请求头Host指定为本服务器主机名
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

> `proxy_pass`指定的地址若无URI（如`http://127.0.0.1:51000`）则保留原URI，否则（如`http://127.0.0.1:51000/`）用此URI代替`location`匹配到的部分

## websocket反向代理

```
map $http_upgrade $connection_upgrade {
    default upgrade;
    '' close;
}

server {
    ...

    location ... {
        proxy_pass ...;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
    }

    ...
}
```

## nginx目录结构样例

- `/etc/nginx/`
    - `nginx.conf`
    - `cert/`
        - `example.com/` 注：证书也可以放在其他地方，如certbot生成证书的目录，需要修改`snippets/https-example-com.conf`文件中的证书目录
            - `fullchain.pem`
            - `privkey.pem`
        - `dhparam.pem`
    - `snippets/`
        - `https-example-com.conf`
        - `proxy.conf`
    - `sites-enabled/` 注：在`nginx.conf`的`http`块中添加`include /etc/nginx/sites-enabled/*.on`
        - `www.on`
        - `test.on`

### snippets/https-example-com.conf

```
ssl_certificate "/etc/nginx/cert/example.com/fullchain.pem";
ssl_certificate_key "/etc/nginx/cert/example.com/privkey.pem";
ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_session_cache shared:SSL:10m;
ssl_session_timeout 10m;
ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
ssl_prefer_server_ciphers on;
add_header Strict-Transport-Security "max-age=63072000; preload";
add_header X-Frame-Options DENY;
add_header X-Content-Type-Options nosniff;
ssl_stapling on;
ssl_stapling_verify on;
ssl_dhparam /etc/nginx/cert/dhparam.pem;
resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 10s;
```

### snippets/proxy.conf

```
proxy_set_header Host $host;
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

### sites-enabled/www.on

```
server {
    server_name _;
    listen 80 default_server;

    access_log off;
    error_log off;

    return 404;
}

server {
    server_name _;
    listen 443 ssl default_server;

    include snippets/https-example-com.conf;

    access_log off;
    error_log off;

    return 404;
}

server {
    server_name *.example.com example.com;
    listen 80;

    access_log off;
    error_log off;

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    server_name example.com;
    listen 443 ssl;

    include snippets/https-example-com.conf;

    access_log off;
    error_log off;

    location / {
        return 301 https://www.example.com$request_uri;
    }
}

server {
    server_name www.example.com;
    listen 443 ssl;

    include snippets/https-example-com.conf;

    access_log /var/log/nginx/www.log;
    error_log /var/log/nginx/www.err;

    location / {
        add_header Content-Type 'text/html; charset=utf-8';
        return 200 '<h1>Hello world!</h1>';
    }
}
```

### sites-enabled/test.on

```
server {
    server_name test.example.com;
    listen 443 ssl;

    include snippets/https-example-com.conf;

    access_log /var/log/nginx/test.log;
    error_log /var/log/nginx/test.err;

    location ^~ /api/ {
        proxy_pass http://127.0.0.1:51000/;
        include snippets/proxy.conf;
    }

    location / {
        root /runtime/web/test;
    }
}
```

## whoami - 显示请求者信息的简易测试网站

```
location / {
    add_header Content-Type 'text/html; charset=utf-8';
    return 200 '<h1>whoami6</h1><p><b>IP:</b> $remote_addr</p><p><b>Port:</b> $remote_port</p><p><b>UA:</b> $http_user_agent</p>';
}
```
