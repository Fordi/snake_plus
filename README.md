# Snake+

Derived from the PicoSystem snake example, it's enhanced with sprites, sounds, structure, and pumpkins!
## Building

### Install the tool chain.

```
$ sudo apt update
$ sudo apt install cmake gcc-arm-none-eabi libnewlib-arm-none-eabi libstdc++-arm-none-eabi-newlib build-essential
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
$ . ~/.nvm/nvm.sh
$ nvm install --lts stable
```

### Update the submodules.

This pulls in [Raspberry Pi's Pico SDK](https://github.com/raspberrypi/pico-sdk), [Pimoroni's PicoSystem Sdk](https://github.com/raspberrypi/pico-sdk) and pulls [TinyUSB](https://github.com/hathach/tinyusb) into pico-sdk.
```
$ git submodule update --init
$ cd pico-sdk
$ git submodule update --init
$ cd ..
```

### Create the build folder and build Snake+

After making you'll be able to drag the `build/games/hello-world/hello-world.uf2` into the PicoSystem when it's booted into [DFU mode](https://github.com/pimoroni/picosystem#booting-picosystem-into-dfu-mode).
```
$ mkdir build
$ cd build
$ ../tools/build-spritesheet.js '../game/assets/*.png'
$ cmake ..
$ make -j8
```

## Modding

If you make changes to any spritesheet, remember to run the following, or you won't see them in the compiled game:

```bash
$ ../tools/build-spritesheet.js '../game/assets/*.png'
```
