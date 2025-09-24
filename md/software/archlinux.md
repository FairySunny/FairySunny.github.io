# 安装及配置Arch Linux

> https://wiki.archlinux.org/

## 安装系统

> https://wiki.archlinux.org/title/Installation_guide

### 预安装

- vim
- sudo
- networkmanager
- man-db man-pages texinfo

## 安装问题

### 临时禁用蜂鸣器

`rmmod pcspkr`

### GRUB的os-prober无效

安装完系统后重试

## 基础配置

### 网络

#### Option 1: NetworkManager

> 2025-09
>
> https://wiki.archlinux.org/title/NetworkManager

- `systemctl enable --now NetworkManager`
- `nmtui`

#### Option 2: systemd-networkd

> 2025-09
>
> https://wiki.archlinux.org/title/Systemd-networkd
>
> https://wiki.archlinux.org/title/Systemd-resolved

- `systemctl enable --now systemd-resolved`
- `ln -sf ../run/systemd/resolve/stub-resolv.conf /etc/resolv.conf`
- `ln -s /usr/lib/systemd/network/89-ethernet.network.example /etc/systemd/network/89-ethernet.network`
- `systemctl enable --now systemd-networkd`

### 创建用户

- `useradd xxx -m -U`
- `passwd xxx`

### 设置sudo

- `EDITOR=vim visudo`
- 添加`Defaults editor=/usr/bin/vim`
- 取消注释`%wheel ALL=(ALL:ALL) ALL`
- `usermod -a -G wheel xxx`
- 登出、切换用户

### paru

- AUR: paru-bin

## 基础问题

### 禁用蜂鸣器

> https://wiki.archlinux.org/title/Kernel_module

- 在`/etc/modprobe.d/nobeep.conf`里添加`blacklist pcspkr`

### EFI分区空间不足（EFI分区挂载在boot目录下）

- 删除`/boot/initramfs-linux-fallback.img`
- 修改`/etc/mkinitcpio.d/linux.preset`文件，在`PRESETS`后去掉`'fallback'`，注释掉以`fallback_`开头的行，以禁止生成`/boot/initramfs-linux-fallback.img`

## 桌面配置

### gnome桌面

基础:

- gnome-shell
- gdm
- gnome-control-center (Settings)
- gnome-tweaks
- nautilus (Files)
- gedit
- loupe (Image Viewer)
- file-roller (Archive Manager)
- gnome-terminal
- baobab (Disk Usage Analyzer)
- gnome-disk-utility (Disks)

附加:

- resources
- flathub: com.mattjakeman.ExtensionManager / AUR: extension-manager

通用:

- chromium
- vlc vlc-plugin-ffmpeg

#### 启用gdm

- `sudo systemctl enable gdm.service`

### nvidia驱动

> https://wiki.archlinux.org/title/NVIDIA

- nvidia-open / nvidia

### 字体

#### Option 1: Win11字体（自动）

> https://wiki.archlinux.org/title/Fonts
>
> https://wiki.archlinux.org/title/Microsoft_fonts

- AUR: ttf-ms-win11-auto ttf-ms-win11-auto-zh_cn ttf-ms-win11-auto-other
- 可能失败

#### Option 2: Win11字体（手动）

- AUR: ttf-ms-win11 ttf-ms-win11-zh_cn ttf-ms-win11-other
- 需要按照`PKGBUILD`中的提示从Windows拷贝字体

#### Option 3: adobe-source-han

> https://wiki.archlinux.org/title/Localization/Chinese

- adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts

### 输入法

> https://wiki.archlinux.org/title/IBus

- ibus-rime
- （登出或重启后）在Settings -> Keyboard -> Input Sources中添加Chinese (Rime)
- 按F4选择简体

### gnome配置

- 在Settings -> Power以及Settings -> Privacy -> Screen Lock中设置屏幕行为
- 在Settings -> Mouse & Touchpad以及Tweaks -> Keyboard & Mouse中设置触控板行为
- 在Settings -> Keyboard -> Keyboard Shortcuts中设置快捷键
    - 将Switch windows设置为Alt+Tab会自动将Switch applications设置为Disabled

### 缩放

#### Option 1: 字体缩放

- Tweaks -> Fonts -> Scaling Factor

#### Option 2: 非整数倍缩放 (X11)

> https://aur.archlinux.org/packages/mutter-x11-scaling

- AUR: mutter-x11-scaling
- `gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"`
- 在Settings -> Displays中设置非整数倍缩放

### gnome主题

- 在Extensions中打开User Themes
- 在 https://gnome-look.org/ 上下载主题
- 将主题解压到`~/.themes`中，将图标（以及光标）解压到`~/.icons`中
- 在Tweaks -> Appearance中设置主题与图标

### 蓝牙

- `sudo systemctl enable --now bluetooth.service`
- 蓝牙耳机：如果是和Windows双系统，在Windows上取消配对
