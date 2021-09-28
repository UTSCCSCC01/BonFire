<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Compatibility
Be sure to run using Node 14 and npm 7

## Installation

```bash
$ npm install --include=dev
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Database
 Database credentials should be stored in [.env](.env) which should be created from [.env.bak](.env.bak). Follow these steps withing the [.env.bak](.env.bak) to connect prisma to your local db
```bash
$ cp .env.bak .env
```

Setup with MacOS
```bash
$ brew install mysql
$ brew services start mysql
$ brew services stop mysql
```

Adding a mysql connection
- Run mysql as root in bash
```bash
mysql -uroot
```
- Update the connection username/password
```SQL
ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOURNEWPASSWORD';
```
- Now go to .env file and update it with your username and password

```bash
\# to apply schema to your database
$ npx prisma push

\# To reflect prisma changes to the database run the following
$ npx prisma generate
```
