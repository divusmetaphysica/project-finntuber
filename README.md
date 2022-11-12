# Project Finntuber

Project Finntuber is a website to list and showcase the scene of Finnish VTubers. This started
as a personal project to check and list all of them. To help others find these talented content
creators, this website will prove to be a great help.

The site is deployed to [Project Finntuber](www.finntubers.fi)

## Project setup

Using locally Node version 14.15.5 and the deployment target is node v14

```bash
npm install
```

### Install command line tools

Ensure you have the necessary command line tools installed.

Install Azure Static Web Apps CLI.

```bash
npm install -g @azure/static-web-apps-cli
```

Install Azure Functions Core Tools V3.

```bash
npm install -g azure-functions-core-tools@3
```

### Compiles and hot-reloads for development

```bash
npm run serve
```

To run also the functions run

```bash
npm run build && swa start dist --api api
```

### Compiles and minifies for production

```bash
npm run build
```

### Lints and fixes files

```bash
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Calculate current vtuber count

```bash
cat finntubers.json | jq '.[] | select( .channel != null) | .name' | sed 's/"//g' | sort | wc -l
```