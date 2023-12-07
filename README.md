# Storefront Backend - Udacity Project

### Here is my solution for the project

### the container need to be create, run from the root of the project this command, make sure docker desktop is working

     $  docker-compose up

## Environment variables

```bash
ENV=dev
POSTGRES_USER=root
POSTGRES_PASSWORD=root
POSTGRES_DB=dev_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER_TEST=test_root
POSTGRES_PASSWORD_TEST=test_root
POSTGRES_DB_TEST=test_db
POSTGRES_HOST_TEST=localhost
POSTGRES_PORT_TEST=5433
BCRYPT_PASSWORD=winteriscoming
TOKEN_SECERT=winteriscoming
SALT_ROUNDES=8
```

## Setup to run the project

### Install dependencies

    $ npm i

## Run the migrations

    $ db-migrate up

### Run the project

    $ npm run start

### Build the project

    $ npm run build

### test the project

    $ npm run test

### Run jasmine

    $ npm run jasmine

### Run eslint

    $ npm run eslint

### Run Prettier

    $ npm run prettier
