# Tricks

> Updated: 2024-08

### 移除CSDN“关注博主即可阅读全文”

```javascript
document.querySelector('.hide-article-box').remove()
document.getElementById('article_content').style = ''
```

### 获取百度文库文本

```javascript
let str = ''
document.querySelectorAll('.p-txt').forEach(e => str += e.innerText + '\n')
console.log(str)
```

### 移除B站直播打码

```javascript
document.querySelectorAll('.web-player-module-area-mask').forEach(e => e.remove())
```
