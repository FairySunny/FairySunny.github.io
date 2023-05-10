# 安装及配置Arch Linux

> 参考：https://wiki.archlinux.org/
> 上次更新：2023-5-10

## 安装系统

> 参考 https://wiki.archlinux.org/title/Installation_guide

### 安装时联网后获取ip地址

- `dhcpcd`

### 预安装

- nano
- sudo
- networkmanager

## 基础配置

### 网络

> 参考 https://wiki.archlinux.org/title/NetworkManager

```sh
systemctl enable NetworkManager
systemctl start NetworkManager
nmcli device wifi connect xxx
```

### 创建用户

- `useradd xxx -m -U`
- `passwd xxx`

### 设置visudo编辑器

- 在`/etc/sudoers`里添加`Defaults editor=/usr/bin/nano`

### 设置sudo

- 在visudo里取消注释`%wheel ALL=(ALL:ALL) NOPASSWD: ALL`
- `usermod -a -G wheel xxx`
- 登出、切换用户

## 基础问题

### EFI分区空间不足（EFI分区挂载在boot目录下）

- 删除`/boot/initramfs-linux-fallback.img`
- 修改`/etc/mkinitcpio.d/linux.preset`文件，在`PRESETS`后去掉`'fallback'`，注释掉以`fallback_`开头的行，以禁止生成`/boot/initramfs-linux-fallback.img`

## 桌面配置

### gnome桌面

- `sudo pacman -S gnome gnome-tweaks`

### nvidia驱动

> 参考 https://wiki.archlinux.org/title/NVIDIA

- `sudo pacman -S nvidia`
- 将`/etc/mkinitcpio.conf`中的`MODULES=()`改为`MODULES=(nvidia nvidia_modeset nvidia_uvm nvidia_drm)`
- `sudo mkinitcpio -p linux`
- 创建`/etc/pacman.d/hooks/nvidia.hook`，内容为：

    ```ini
    [Trigger]
    Operation=Install
    Operation=Upgrade
    Operation=Remove
    Type=Package
    Target=nvidia
    Target=linux

    [Action]
    Description=Update NVIDIA module in initcpio
    Depends=mkinitcpio
    When=PostTransaction
    NeedsTargets
    Exec=/bin/sh -c 'while read -r trg; do case $trg in linux) exit 0; esac; done; /usr/bin/mkinitcpio -P'
    ```

- 重启

### paru

- 见 https://github.com/morganamilo/paru

### chrome

- `paru -S google-chrome`

### 字体

> 参考
> https://wiki.archlinux.org/title/Fonts
> https://wiki.archlinux.org/title/Localization/Chinese#Fonts

- `sudo pacman -S adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts`

### 输入法

> 参考 https://wiki.archlinux.org/title/Fcitx5

- `sudo pacman -S fcitx5-im`
- `sudo pacman -S fcitx5-chinese-addons`
- 在`/etc/environment`中添加：

    ```
    GTK_IM_MODULE=fcitx
    QT_IM_MODULE=fcitx
    XMODIFIERS=@im=fcitx
    SDL_IM_MODULE=fcitx
    ```

- 在Fcitx 5 Configuration中配置

### gnome配置

- 在Settings -> Power中设置屏幕行为
- 在Settings -> Mouse & Touchpad以及Tweaks -> Keyboard & Mouse中设置触控板行为
- 在Settings -> Keyboard中设置快捷键
    - 将Switch windows设置为Alt+Tab会自动将Switch applications设置为Disabled
    - 将Typing中的快捷键设置为Disabled后，即可在Fcitx 5 Configuration中将输入法切换设置为Super+Space

### 非整数倍缩放

> 参考 https://aur.archlinux.org/packages/mutter-x11-scaling

- `paru -S mutter-x11-scaling`
- `gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"`
- 在Settings -> Displays中设置非整数倍缩放

### gnome扩展

- 安装Chrome插件GNOME Shell integration
- `paru -S gnome-browser-connector`
- 在 https://extensions.gnome.org/ 上安装扩展

### gnome主题

- 在Extensions中打开User Themes
- 在 https://gnome-look.org/ 上下载主题
- 将主题解压到`~/.themes`中，将图标（以及光标）解压到`~/.icons`中
- 在Tweaks -> Appearance中设置主题与图标

### chrome、vscode等应用切换时滚动问题

> 参考 https://github.com/lucasresck/gnome-shell-extension-alt-tab-scroll-workaround

- 安装gnome扩展Alt+Tab Scroll Workaround

### 打开文件夹默认应用为vscode而非files

> 参考 https://www.reddit.com/r/gnome/comments/8gtmkw/how_to_change_what_application_open_folders/

- `gio mime inode/directory`查看打开文件夹默认应用
- `gio mime inode/directory org.gnome.Nautilus.desktop`，会修改配置文件`~/.config/mimeapps.list`

### 连接蓝牙耳机（？）

- `sudo pacman -S pipewire-pulse` （？）
- 如果是和Windows双系统，在Windows上取消配对
