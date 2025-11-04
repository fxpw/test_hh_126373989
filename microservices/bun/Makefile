exec_in_container=docker compose exec bun_126373989

.PHONY: build start
all: build start
build:
	docker compose build
build_no_cache:
	docker compose build --no-cache
stop:
	docker compose down
down:
	docker compose down
run:
	docker compose up -d
up:
	docker compose up -d
start:
	docker compose up -d
build_start:
	docker compose build
rebuild: down build_no_cache up
	echo "rebuild"


current_date := $(shell date +%Y%m%d%H%M%S)

m := $(or $(m), create-migration)
MIGRATION_NAME = $(m)

s := $(or $(s), create-seeder)
SEEDER_NAME = $(s)


