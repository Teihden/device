# Project "Device"
[![CI](https://github.com/Teihden/device/actions/workflows/CI.yml/badge.svg)](https://github.com/Teihden/device/actions/workflows/CI.yml)
[![Github Pages](https://github.com/Teihden/device/actions/workflows/github-pages.yml/badge.svg)](https://github.com/Teihden/device/actions/workflows/github-pages.yml)

## Setup

```shell
# Install dependencies (with flag "--force")
make install
```

## CLI

```shell
# Runs Stylelint, pug-lint against source code for quality
make lint
```

## Gulp tasks

```shell
# Starts Browsersync server and watch Sass, Pug files for changes
server

# Runs pug-lint, Pug, Stylelint, Sass, PurgeCSS, Autoprefixer in sequential order
build

# Runs pug-lint, Pug, Stylelint, Sass, starts Browsersync server
# in sequential order and wathes for changes
default
```
