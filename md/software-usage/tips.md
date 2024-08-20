# Tips

> Last Modified: 2024-08

### electron

#### GPU process isn't usable. Goodbye.

https://github.com/Automattic/simplenote-electron/issues/3096

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

#### (x11)

- `-v /tmp/.X11-unix/:/tmp/.X11-unix/:ro` or `--net host`
- `-v $XAUTHORITY:/root/.Xauthority:ro` or (on host) `xhost +`
- `-e DISPLAY`

### obs

#### qt.qpa.plugin: Could not find the Qt platform plugin "wayland" in ""

https://wiki.archlinux.org/title/Open_Broadcaster_Software#Wayland

#### (pipewire screen sharing)

https://wiki.archlinux.org/title/PipeWire#WirePlumber

https://wiki.archlinux.org/title/PipeWire#WebRTC_screen_sharing

install `wireplumber`

### pip

#### ImportError: cannot import name 'packaging' from 'pkg_resources'

https://github.com/aws-neuron/aws-neuron-sdk/issues/893

### PyTorch

#### Could not load library libcudnn_cnn_infer.so.8.

https://discuss.pytorch.org/t/could-not-load-library-libcudnn-cnn-infer-so-8/175139

#### undefined symbol: iJIT_NotifyEvent

https://github.com/pytorch/pytorch/issues/123097

### Minecraft

#### (wayland)

wayland: https://github.com/BoyOrigin/glfw-wayland

xwayland + nvidia: `__GL_THREADED_OPTIMIZATIONS=0`
