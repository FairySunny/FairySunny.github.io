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

### NVIDIA 驱动

> https://wiki.archlinux.org/title/NVIDIA

- nvidia-open / nvidia

### GNOME 桌面

> 2025-10

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

- extension-manager
- gnome-shell-extension-appindicator

通用:

- chromium
- vlc vlc-plugin-ffmpeg
- mission-center

#### 启用 GDM

- `sudo systemctl enable gdm.service`

#### 配置

- 在 Settings -> Power 以及 Settings -> Privacy -> Screen Lock 中设置屏幕行为
- 在 Settings -> Keyboard -> Keyboard Shortcuts 中设置快捷键
    - 将 Navigation -> Switch windows 设置为 <kbd>Alt</kbd> + <kbd>Tab</kbd> 会自动禁用 Navigation -> Switch applications

#### 缩放

##### Option 1: 字体缩放

- Tweaks -> Fonts -> Scaling Factor

##### Option 2: 非整数倍缩放 (Xorg)

> （上次更新：很久以前）
>
> https://aur.archlinux.org/packages/mutter-x11-scaling

- AUR: mutter-x11-scaling
- `gsettings set org.gnome.mutter experimental-features "['x11-randr-fractional-scaling']"`
- 在 Settings -> Displays 中设置非整数倍缩放

#### 主题

> （上次更新：很久以前）

- Extension: User Themes
- 在 https://gnome-look.org/ 上下载主题
- 将主题解压到 `~/.themes` 中，将图标（以及光标）解压到 `~/.icons` 中
- 在 Tweaks -> Appearance 中设置主题与图标

### 字体

#### Option 1: Win11 字体（自动）

> https://wiki.archlinux.org/title/Fonts
>
> https://wiki.archlinux.org/title/Microsoft_fonts

- AUR: ttf-ms-win11-auto ttf-ms-win11-auto-zh_cn ttf-ms-win11-auto-other
- 可能失败

#### Option 2: Win11 字体（手动）

- AUR: ttf-ms-win11 ttf-ms-win11-zh_cn ttf-ms-win11-other
- 需要按照 `PKGBUILD` 中的提示从 Windows 拷贝字体

#### Option 3: adobe-source-han

> https://wiki.archlinux.org/title/Localization/Chinese

- adobe-source-han-sans-cn-fonts adobe-source-han-serif-cn-fonts

### 输入法

#### Option 1: IBus (GNOME)

> 2025-09
>
> https://wiki.archlinux.org/title/IBus

- ibus-rime
- 登出或重启后，在 Settings -> Keyboard -> Input Sources 中添加 Chinese (Rime)
- 按 <kbd>F4</kbd> 选择简体

#### Option 2: Fcitx5

> 2025-09
>
> https://wiki.archlinux.org/title/Fcitx5

- fcitx5-im fcitx5-chinese-addons
- ? (Xorg) `GTK_IM_MODULE=fcitx` `QT_IM_MODULE=fcitx` `XMODIFIERS=@im=fcitx`

### 蓝牙

- `sudo systemctl enable --now bluetooth.service`
- 蓝牙耳机：如果是和Windows双系统，在Windows上取消配对
