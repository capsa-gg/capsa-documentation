# Capsa documentation website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm i
```

### Local Development

```
$ npm run start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

Before creating a PR, please run

```
$ npm run fmt
```

to run Prettier to format the code.

### Build

```
$ npm run build build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Commits on the `main` branch are automatically deployed to GitHub Pages for hosting.
