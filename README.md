# dyh.dev

> My personal portfolio webpage. Regularly updated as I see fit

[![last_commit](https://badgen.net/github/last-commit/danielyanghansen/dyh.dev)]

> There are many things to do. I track the issues I want to fix.

[![open_issues](https://badgen.net/github/open-issues/danielyanghansen/dyh.dev)]

## Prerequisites

- [Docker](https://docs.docker.com/) : For you to be able to run the app in production as intended.
- [Bun](aa.com) : Used as a package manager. Replaces `yarn`, `npm` etc.

## Sections

1. [Quick Start](#quick-start)
2. [Build and Deploy](#build-and-deploy)
3. [Working with ThreeJS](#working-with-threejs)

## Quick Start

```sh
bun install # install dependencies
bun run dev # start webserver. Currently no backend.
```

The webapp should now be running on [localhost:5137](http://localhost:5137). Keep in mind that not everything is 100% "hot-reload'able", so you might have to hard refresh to get your recently saved changes sometimes.
This is mostly the case for libraries like `redux` and `three`

## Build and Deploy

### Dockerized deployment

...
Everything is configured in the `Dockerfile` and the `docker-compose.yml` files.
All you have to run in

```sh
docker-compose up -d
```

And you will have a running production container on **PORT 3000**

### Manual deployment

In case you don't want to run things on docker, you can use the regular bun scripts

First, bundle and build the source code into the `dist` folder

```sh
bun bundle
```

> The dist folder should be reconstructed every time you rerun the script

There are two ways to run the build:

- **serve mode**: Meant for long term serving.
- **vite preview mode**: This is mostly to confirm that the built bundle works as expected

To run the bundled code in **serve mode**:

```sh
bun serve # this will automatically serve the webapp on port:3000
```

You can also serve to a specific port manually with:

```sh
serve -s ./dist -l <PORT NUMBER>
```

To run the bundled code in **preview mode**:

```sh
bun preview
```

## Working with ThreeJS

Take note that ThreeJS uses WebGL, so the performance changes drastically with how much optimization is done.

### Resource disposal / garbage collection

TODO...
