# Windows快捷脚本

> 上次更新：很久以前

- 脚本第一行加上`@echo off`关闭命令回显
- 脚本最后一行加上`pause`防止黑框自动关闭
- 需要以管理员身份运行的脚本可以创建快捷方式并设置快捷方式以管理员身份运行

## 热点

- 开热点（管理员）：

    ```bat
    netsh wlan start hostednetwork
    ```

- 关热点：

    ```bat
    netsh wlan stop hostednetwork
    ```

## 拨号上网

rasdial 连接名称 用户名 密码

```bat
rasdial yd menghenry7@yd 447923
```
