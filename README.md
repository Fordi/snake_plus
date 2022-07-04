# Snake+ (JS edition)

Derived from the PicoSystem snake example, it's enhanced with sprites, sounds, structure, and pumpkins!

## Running locally

### Install the tool chain.

Please have [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) installed for OS-X and Linux, or [nvm-windows](https://github.com/coreybutler/nvm-windows/releases) and [git-bash](https://git-scm.com/download/win) installed for windows.


```bash
./nvm_use
npm ci
```

### Start the app

```bash
npm run start
```

## Modding

If you make changes to any spritesheet, remember to run the following, or you won't see them in the compiled game:

```bash
$ ../tools/build-spritesheet.js '../game/assets/*.png'
```
