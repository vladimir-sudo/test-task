# Test task

## 1. What we need

### 1.1 Tools
- Docker Engine **^20.10** version
- Docker Compose **^1.25** version
- mkcert lib. [github](https://github.com/FiloSottile/mkcert)

### 1.2 Ports

Before starting docker, you need to make sure the following ports are free:
- 80, 443 - traefik
- 9230 - nest.js debug

## 2. How to use

### 2.1. Configs

- Need add `testtask.local` and `testtask-traefik.local` domains to your `hosts` file
- Create folder history `_docker/common/history`
- Create new `.env` file from `.env.example.local`

### 2.2 Build & run

#### 2.2.1. First deploy

- Run `bash _bash/main.sh deploy` to deploy application
- After postgres container started need run `bash _bash/main.sh syncOrmSchema` for sync schema

#### 2.2.2. Up

- Run `bash _bash/main.sh start` to up application

#### 2.2.2. Down

- Run `bash _bash/main.sh down` to down application

##### 3. Queries for Api

```For upload file dump
curl --location 'http://localhost:3000/graphql' \
--header 'Apollo-Require-Preflight: true' \
--form 'operations="{ \"query\": \"mutation ($file: Upload!) { doImport(file: $file) { status, message } }\", \"variables\": { \"file\": null } }"' \
--form 'map="{ \"file\": [\"variables.file\"] }"' \
--form 'file=@"/path_to_you_file/dump.txt"'
```

```For get employees remunerations
curl --location 'http://localhost:3000/graphql' \
--header 'Content-Type: application/json' \
--data '{"query":"query GetEmployeesRemunerations($pool: Int!) {\n    employeesRemunerations(pool: $pool) {\n        id,\n        name,\n        surname,\n        remunerationPercentage,\n        remuneration\n    }\n}","variables":{}}'
```

