# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:terra456/nodejs2022Q4-service.git
```

## Change branch to "part2"

```
git checkout remotes/part2
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

# Run application in docker conteiner

Rename .env.copy file to .env
```
cp .env.copy .env
```

Build an image
```
docker-compose up --build
```

If volume did not created, create it (I dont know how it will be work in windows, because there is no different access permissions).
```
docker volume create --name=pgdata
```

If will be an error "Permission denied" change access permissions (there must be better way for security, it's the simplest and unsafe solution).
```
sudo chmod -R 777 pgdata
```

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
