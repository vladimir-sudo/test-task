#!/usr/bin/env bash
# shellcheck disable=SC2028,SC1068,SC2164,SC2162,SC1090

APP_DIR="$(
    cd -- "$(dirname "$0")" >/dev/null 2>&1
    pwd -P
)/../"

cd "$APP_DIR"

function generateCerts() {
    cd ./_docker/certs || exit

    mkcert -cert-file testtask.pem -key-file testtask.key.pem testtask.local
    mkcert -cert-file testtask-traefik.pem -key-file testtask-traefik.key.pem testtask-traefik.local

    cd "$APP_DIR"
}

function start() {
    docker-compose up -d --build --remove-orphans --force-recreate
}

function migrate() {
    docker-compose exec test_task_nest npm run typeorm:migration:run
}

function down() {
    docker-compose down
}

function deploy() {
    generateCerts

    start
}

"$@"
