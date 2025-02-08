# Tips

> Last Modified: 2025-02

### electron

#### GPU process isn't usable. Goodbye.

https://github.com/Automattic/simplenote-electron/issues/3096

`--no-sandbox`

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

#### (x11)

- `-v /tmp/.X11-unix/:/tmp/.X11-unix/:ro` or `--net host`
- `-v $XAUTHORITY:/root/.Xauthority:ro` or (on host) `xhost +`
- `-e DISPLAY`

### obs

#### qt.qpa.plugin: Could not find the Qt platform plugin "wayland" in ""

https://wiki.archlinux.org/title/Open_Broadcaster_Software#Wayland

install `qt6-wayland`

#### (pipewire screen sharing)

https://wiki.archlinux.org/title/PipeWire#WirePlumber

https://wiki.archlinux.org/title/PipeWire#WebRTC_screen_sharing

install `wireplumber`

### conda

#### (micromamba environment variables)

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

### gtk

#### (PyGObject)

https://gitlab.gnome.org/GNOME/gobject-introspection/-/blob/main/girepository/girepository.c?ref_type=heads

`GI_TYPELIB_PATH=/usr/lib/girepository-1.0`

### wine

#### (Chinese fonts)

`LANG=zh_CN.UTF-8`

### Minecraft

#### Failed to get OpenAL attributes

https://wiki.archlinux.org/title/Minecraft#Audio_stutters_on_PipeWire

`ALSOFT_DRIVERS=pulse`

#### (wayland)

wayland: https://github.com/BoyOrigin/glfw-wayland

xwayland + nvidia: `__GL_THREADED_OPTIMIZATIONS=0`
