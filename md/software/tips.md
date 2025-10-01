# Tips

### glibc

#### (2.41) cannot enable executable stack as shared object requires: Invalid argument

https://forums.developer.nvidia.com/t/linux-gblic-2-41-unable-to-load-library-libnvinfer-builder-resource-so-10-7-0/323729

`patchelf --clear-execstack <filename>`

### nvidia

#### (xorg: screen tearing)

https://wiki.archlinux.org/title/NVIDIA/Troubleshooting#Avoid_screen_tearing

`/etc/X11/xorg.conf.d/20-nvidia.conf` :

```
Section "Screen"
    Identifier     "Screen0"
    Option         "ForceFullCompositionPipeline" "on"
    Option         "AllowIndirectGLXProtocol" "off"
    Option         "TripleBuffer" "on"
EndSection
```

### ssh

#### expecting SSH2_MSG_KEX_ECDH_REPLY

https://serverfault.com/questions/1058473/unable-to-ssh-into-server

### node.js

#### ERR_OSSL_EVP_UNSUPPORTED

https://stackoverflow.com/questions/70582072/npm-run-fails-with-err-ossl-evp-unsupported

### flatpak

#### GLX: Failed to find a suitable GLXFBConfig

https://github.com/PrismLauncher/PrismLauncher/issues/866

### podman

#### The cgroupv2 manager is set to systemd but there is no systemd user session available

https://superuser.com/questions/1788594/podman-the-cgroupv2-manager-is-set-to-systemd-but-there-is-no-systemd-user-sess

`loginctl enable-linger`

#### (rootless host loopback)

https://docs.podman.io/en/latest/markdown/podman-run.1.html#network-mode-net

- `--net slirp4netns:allow_host_loopback=true`
- access `10.0.2.2`

#### (xorg)

- `-v /tmp/.X11-unix/:/tmp/.X11-unix/:ro` or `--net host`
- `-v $XAUTHORITY:/root/.Xauthority:ro` or (on host) `xhost +`
- `-e DISPLAY`

#### (cuda)

https://archlinux.org/packages/?name=nvidia-container-toolkit

- install `nvidia-container-toolkit`
- `--gpus all`

### electron

#### (electron & chromium: `Alt+Tab` scrolling)

https://github.com/lucasresck/gnome-shell-extension-alt-tab-scroll-workaround

install GNOME extension `Alt+Tab Scroll Workaround`

#### GPU process isn't usable. Goodbye.

https://github.com/Automattic/simplenote-electron/issues/3096

`--no-sandbox`

### vscode

#### (visual-studio-code-bin: folder default app)

https://www.reddit.com/r/gnome/comments/8gtmkw/how_to_change_what_application_open_folders/

`gio mime inode/directory org.gnome.Nautilus.desktop`

### obs

#### qt.qpa.plugin: Could not find the Qt platform plugin "wayland" in ""

https://wiki.archlinux.org/title/Open_Broadcaster_Software#Wayland

install `qt6-wayland`

#### (pipewire screen sharing)

https://wiki.archlinux.org/title/PipeWire#WirePlumber

https://wiki.archlinux.org/title/PipeWire#WebRTC_screen_sharing

install `wireplumber`

### conda

#### (micromamba: environment variables)

https://github.com/mamba-org/mamba/issues/1881

### pip

#### ImportError: cannot import name 'packaging' from 'pkg_resources'

https://github.com/aws-neuron/aws-neuron-sdk/issues/893

### PyTorch

#### Could not load library libcudnn_cnn_infer.so.8.

https://discuss.pytorch.org/t/could-not-load-library-libcudnn-cnn-infer-so-8/175139

`LD_LIBRARY_PATH=/path/to/cuda/lib64`

#### undefined symbol: iJIT_NotifyEvent

https://github.com/pytorch/pytorch/issues/123097

install `mkl=2024.0.0`

#### (torch.inverse) RuntimeError: lazy wrapper should be called at most once

https://github.com/pytorch/pytorch/issues/90613

`torch.inverse(torch.eye(1, device='cuda'))`

#### nvrtc: error: invalid value for --gpu-architecture (-arch)

https://github.com/pytorch/pytorch/issues/87595

use pytorch >= 1.13.0

### cuda

#### (glibc 2.41/2.42)

https://forums.developer.nvidia.com/t/error-exception-specification-is-incompatible-for-cospi-sinpi-cospif-sinpif-with-glibc-2-41/323591/3

https://github.com/gentoo/gentoo/blob/master/dev-util/nvidia-cuda-toolkit/files/nvidia-cuda-toolkit-glibc-2.41-r1.patch

https://github.com/gentoo/gentoo/blob/master/dev-util/nvidia-cuda-toolkit/files/nvidia-cuda-toolkit-glibc-2.42.patch

### gtk

#### (PyGObject)

https://gitlab.gnome.org/GNOME/gobject-introspection/-/blob/main/girepository/girepository.c?ref_type=heads

`GI_TYPELIB_PATH=/usr/lib/girepository-1.0`

### qemu

#### (virtio-vga-gl)

> 2025-09

install:

- `qemu-hw-display-virtio-vga`
- `qemu-hw-display-virtio-vga-gl`
- `qemu-hw-display-virtio-gpu`
- `qemu-hw-display-virtio-gpu-gl`

#### (sway cursor)

> 2025-09 https://github.com/swaywm/sway/issues/6581

env: `WLR_NO_HARDWARE_CURSORS=1`

#### (linux mouse)

kernel config: `CONFIG_MOUSE_PS2_VMMOUSE=y`

### wine

#### (Chinese fonts)

`LANG=zh_CN.UTF-8`

### MeshLab

#### (buffer object rendering)

https://www.youtube.com/watch?v=ZbyzQHo666E

Tools -> Options -> `MeshLab::System::maxGPUMemDedicatedToGeometry` = `3500`

### Minecraft

#### Failed to get OpenAL attributes

https://wiki.archlinux.org/title/Minecraft#Audio_stutters_on_PipeWire

`ALSOFT_DRIVERS=pulse`

#### (wayland)

wayland: https://github.com/BoyOrigin/glfw-wayland

nvidia xwayland error: `__GL_THREADED_OPTIMIZATIONS=0`
