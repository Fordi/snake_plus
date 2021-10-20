# Snake+

This is a quick and dirty boilerplate repo to get you started quickly developing games for the PicoSystem.

## Building

1. Install the tool chain.
```
$ sudo apt update
$ sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib build-essential
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install --lts stable
```

2. Update the submodules.
This pulls in [Raspberry Pi's Pico SDK](https://github.com/raspberrypi/pico-sdk), [Pimoroni's PicoSystem Sdk](https://github.com/raspberrypi/pico-sdk) and pulls [TinyUSB](https://github.com/hathach/tinyusb) into pico-sdk.
```
$ git submodule update --init
$ cd pico-sdk
$ git submodule update --init
$ cd ..
```

3. Create the build folder and build Snake+
After making you'll be able to drag the `build/games/hello-world/hello-world.uf2` into the PicoSystem when it's booted into [DFU mode](https://github.com/pimoroni/picosystem#booting-picosystem-into-dfu-mode).
```
$ mkdir build
$ cd build
$ ../tools/build-spritesheet.js ../game/assets/snakesheet.png
$ cmake ..
$ make -j8
```
