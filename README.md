# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
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
mv .env.copy .env
```

Build an image
```
docker-compose up --build
```

If error can be with volume for postgress DB
```
docker volume create --name=pgdata
```

If will be an error "Permission denied" during building change access permissions
```
sudo chmod -R 777 pgdata
```

## Logging errors

Errors are loged inside the app conteiner.
./app/logs.txt
./app/logs-error.txt

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
