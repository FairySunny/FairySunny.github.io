# 获取百度文库文本

> 上次更新：很久以前

在浏览器中执行以下js代码

```javascript
let str = ''
document.querySelectorAll('.p-txt').forEach(e => str += e.innerText + '\n')
console.log(str)
```
