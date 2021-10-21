#!/usr/bin/env node
const getPixels = require('get-pixels');
const glob = require('glob');
const { basename } = require('path');
const { writeFile } = require('fs/promises');

const pixels = async src => new Promise((resolve, reject) => {
    getPixels(src, (err, pixels) => {
        if (err) return reject(err);
        resolve(pixels);
    });
});

const find = async pattern => new Promise((resolve, reject) => {
    glob(pattern, (err, files) => {
        if (err) return reject(err);
        resolve(files);
    });
});

const spriteSize = [8, 8];


const inputPattern = process.argv[2];
if (!inputPattern) {
    console.error(`Usage: ${basename(process.argv[1])} [imageFile]`);
    console.log('Converts an image file to a 16-bit RGBA/4444 little-endian array of words in an C++ header file');
    console.log('You can enable the sheet using `use_{filename-sans-extension}()`.');
    console.log('e.g., for `mysptires.png`, you\'ll have a `use_mysprites()` function');
    process.exit(-1);
}
const processInput = async inputFile => {
    const outputFile = `${inputFile.replace(/\.[^\.]+$/, '')}.hpp`;
    const varName = basename(outputFile, '.hpp').toLowerCase();
    const pragmaName = basename(outputFile).toUpperCase().replace(/\W+/g, '_');
    const buf = [];
    const px = await pixels(inputFile);
    const [width, height] = px.shape;
    const [across, down] = [width / spriteSize[0], height / spriteSize[1]];
    buf.push(
        `#ifndef ${pragmaName}`,
        `#define ${pragmaName}`,
        '#include "picosystem.hpp"',
        'using namespace picosystem;',
        `const color_t _sheet_${varName}[${width * height}] = {`
    );
    
    console.log(`Creating spritesheet with ${across *down} sprites`);
    for (let sy = 0; sy < down; sy++) {
        for (let sx = 0; sx < across; sx++) {
            for (let y = 0; y < spriteSize[1]; y++) {
                const lbuf = [];
                for (let x = 0; x < spriteSize[0]; x++) {
                    const lx = sx * spriteSize[0] + x;
                    const ly = sy * spriteSize[1] + y;
                    const r = Math.round(px.get(lx, ly, 0) * 15 / 255);
                    const g = Math.round(px.get(lx, ly, 1) * 15 / 255);
                    const b = Math.round(px.get(lx, ly, 2) * 15 / 255);
                    const a = Math.round(px.get(lx, ly, 3) * 15 / 255);
                    const c = g << 12 | b << 8 | a << 4 | r;
                    lbuf.push(`0x${c.toString(16).padStart(4, '0')}`);
                }
                buf.push(`\t${lbuf.join(', ')}${y === spriteSize[y] - 1 && sy === across - 1 ? '' : ','}`);
            }
            if (sy !== across - 1) buf.push('');
        }
    }
    buf.push(
        '};',
        '',
        `inline void use_${varName}() {`,
        `   spritesheet(buffer(${spriteSize[0]}, ${spriteSize[1] * across * down}, (void*) _sheet_${varName}));`,
        `}`
    );
    buf.push(
        '#endif',
        ''
    );
    await writeFile(outputFile, buf.join('\n'), { encoding: 'utf8' });
};

(async () => {
    const files = await find(inputPattern);
    for (let i = 0; i < files.length; i++) {
        await processInput(files[i]);
    }
})();