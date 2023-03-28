# 移除CSDN“关注博主即可阅读全文”

> 上次更新：2023-3-28

在浏览器中执行以下js代码

```javascript
document.querySelector('.hide-article-box').remove()
document.getElementById('article_content').style = ''
```
