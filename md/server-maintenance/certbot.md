# Certbot

> 参考：https://eff-certbot.readthedocs.io/en/stable/
> 上次更新：2023-3-31

> 注意，certbot包括无插件版和有插件版，无插件版通常使用snap安装，有插件版通常使用pip或pip3安装，两者安装一个即可，同时安装可能会导致问题

## Dockerfile（可选）

```Dockerfile
FROM python:3.9-alpine

# 若在国外环境则去掉换源；若无需插件则将 certbot-dns-插件 改为 certbot
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple && \
    pip install certbot-dns-插件

VOLUME /etc/letsencrypt
```

## 注册

`certbot register`

## 申请

1. 执行
    - 手动: `certbot certonly --manual --preferred-challenges dns-01 -d "example.com,*.example.com"`
    - 自动（脚本）: `certbot certonly --manual --manual-auth-hook 添加DNS记录的脚本 --manual-cleanup-hook 删除DNS记录的脚本 --preferred-challenges dns-01 -d "example.com,*.example.com" -n`
    - 自动（dns插件如godaddy、tencentcloud）: `certbot certonly --authenticator dns-插件 --dns-插件-credentials 配置文件 --dns-插件-propagation-seconds 120 -d "example.com,*.example.com" -n`
2. 手动: 会提示添加解析记录，添加好之后按回车继续
4. 证书为 `/etc/letsencrypt/live/example.com/` 下的 `fullchain.pem` 和 `privkey.pem`
3. 非root用户若需访问证书，将 `/etc/letsencrypt/live/example.com/privkey.pem` 改为访问者组、0640

## 修改

同申请第1、2步

## 续签

1. 执行
    - 手动: `certbot certonly --manual --preferred-challenges dns-01 -d "example.com,*.example.com"`
    - 自动（续签除手动外所有证书）: `certbot renew`
2. 重新加载证书（如果需要），如 `nginx -t && nginx -s reload`
3. 如需强制续签，加上 `--force-renewal`
4. certbot可能会设置定时 `certbot renew`

## 修改DNS记录的hook脚本供参考（godaddy）

### 添加DNS记录的脚本

```javascript
#!/usr/bin/node

const https = require('https')

const BASE_DOMAIN = 'example.com' // your godaddy base domain name here
const API_KEY = '' // your godaddy api key here
const API_SECRET = '' // your godaddy api secret here

const DOMAIN = process.env.CERTBOT_DOMAIN
if (!`.${DOMAIN}`.endsWith(`.${BASE_DOMAIN}`)) {
  console.error(`Wrong domain: ${DOMAIN}`)
  process.exitCode = 1
  return
}
const RECORD_NAME = `_acme-challenge${`.${DOMAIN}`.substring(0, DOMAIN.length - BASE_DOMAIN.length)}`
const RECORD_DATA = process.env.CERTBOT_VALIDATION

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data)
    const headers = {
      Authorization: `sso-key ${API_KEY}:${API_SECRET}`
    }
    if (body) {
      headers['Content-Type'] = 'application/json'
    }
    const req = https.request(url, {
      method,
      headers
    }, res => {
      let resBody = ''
      res.on('data', d => {
        resBody += d
      })
      res.on('end', () => {
        try {
          if (res.statusCode == 200) {
            resolve(resBody ? JSON.parse(resBody): null)
          } else {
            reject(`${res.statusCode} ${resBody}`)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
    req.on('error', e => {
      rej(e)
    })
    if (body) {
      req.write(body)
    }
    req.end()
  })
}

request('GET', `https://api.godaddy.com/v1/domains/${BASE_DOMAIN}/records/TXT/${RECORD_NAME}`).then(r => {
  if (!Array.isArray(r)) {
    throw 'Getting records: Response is not an array'
  }
  r.push({
    type: 'TXT',
    name: RECORD_NAME,
    data: RECORD_DATA,
    ttl: 600
  })
  return request('PUT', `https://api.godaddy.com/v1/domains/${BASE_DOMAIN}/records/TXT/${RECORD_NAME}`, r)
}).then(() => {
  return new Promise(resolve => setTimeout(() => resolve(), 30000))
}).then(() => {
  console.error('Done')
}).catch(e => {
  console.error(e)
  process.exitCode = 1
})
```

### 删除DNS记录的脚本

```javascript
#!/usr/bin/node

const https = require('https')
const child_process = require('child_process')

const BASE_DOMAIN = 'example.com' // your godaddy base domain name here
const API_KEY = '' // your godaddy api key here
const API_SECRET = '' // your godaddy api secret here

const DOMAIN = process.env.CERTBOT_DOMAIN
if (!`.${DOMAIN}`.endsWith(`.${BASE_DOMAIN}`)) {
  console.error(`Wrong domain: ${DOMAIN}`)
  process.exitCode = 1
  return
}
const RECORD_NAME = `_acme-challenge${`.${DOMAIN}`.substring(0, DOMAIN.length - BASE_DOMAIN.length)}`

https.request(`https://api.godaddy.com/v1/domains/${BASE_DOMAIN}/records/TXT/${RECORD_NAME}`, {
  method: 'DELETE',
  headers: {
    Authorization: `sso-key ${API_KEY}:${API_SECRET}`
  }
}, res => {
  res.resume()
  res.on('end', () => {
    console.error('Done')
  })
}).on('error', e => {
  console.error(e)
  process.exitCode = 1
}).end()

child_process.exec('nginx -t && nginx -s reload', (error, stdout, stderr) => {
  console.log(stdout)
  console.error(stderr)
})
```
