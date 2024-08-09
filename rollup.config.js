const svelte = require('rollup-plugin-svelte');
const resolve = require('@rollup/plugin-node-resolve');
const svg = require('rollup-plugin-svg');
const image = require('@rollup/plugin-image');
const commonjs = require('@rollup/plugin-commonjs');
const fs = require('fs');
const path = require('path');

const branding = require('./branding');

// CSS
const postcss = require('rollup-plugin-postcss');
const cssnano = require('cssnano');

// HTML
const htmlBundle = require('rollup-plugin-html-bundle');

// Dev
const livereload = require('rollup-plugin-livereload');
const { spawn } = require('child_process');

// Prod
const terser = require('@rollup/plugin-terser');
const strip = require('@rollup/plugin-strip');

const production = !process.env.ROLLUP_WATCH;

// Ensure output directories exist
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
};

ensureDirExists('dev_output');
ensureDirExists('output');

function serve() {
    // Keep a reference to a spawned server process
    let server;

    function toExit() {
        // kill the server if it exists
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            // Spawn a child server process
            server = spawn(
                'npm',
                ['run', 'start', '--', '--dev'],
                {
                    stdio: ['ignore', 'inherit', 'inherit'],
                    shell: true,
                }
            );

            // Kill server on process termination or exit
            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

module.exports = {
    input: 'src/main.js',
    output: {
        file: 'dev_output/bundle.js',
        format: 'iife',
        name: 'app',
    },
    plugins: [
        svelte({
            include: 'src/**/*.svelte',
        }),
        svelte({
            include: 'node_modules/svelte-spa-router/**/*.svelte'
        }),
        resolve({
            browser: true,
            dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
            extensions: ['.svelte', '.mjs', '.js', '.json', '.node']
        }),
        image(),
        svg(),
        commonjs(),
        postcss({
            extensions: ['.css'],
            plugins: [cssnano()]
        }),
        production && htmlBundle({
            template: 'src/index.html',
            target: 'output/'+branding.export_filename,
            inline: true
        }),
        !production && htmlBundle({
            template: 'src/index.html',
            target: 'dev_output/index.html',
            inline: false
        }),
        production && strip(),
        production && terser(),
        !production && serve(),
        !production && livereload('dev_output'),
    ],
};
