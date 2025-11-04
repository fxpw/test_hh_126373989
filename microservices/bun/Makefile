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


# Создать пустую миграцию вручную
migration-create:
	$(exec_in_container) bunx typeorm-ts-node-commonjs migration:create \
		src/infrastructure/db/migrations/$(name)

# Сгенерировать миграцию на основе изменений сущностей
migration-generate:
	$(exec_in_container) bunx typeorm-ts-node-commonjs migration:generate \
		-d src/infrastructure/db/data-source.ts src/infrastructure/db/migrations/$(name)

# Применить все миграции
migration-run:
	$(exec_in_container) bunx typeorm-ts-node-commonjs migration:run \
		-d src/infrastructure/db/data-source.ts

# Откатить последнюю миграцию
migration-revert:
	$(exec_in_container) bunx typeorm-ts-node-commonjs migration:revert \
		-d src/infrastructure/db/data-source.ts

# Полный цикл миграции (сгенерировать и применить)
migrate: migration-generate migration-run
	@echo "✅ Миграция выполнена"

# Пример вызовов
# make migration-create name=init_tasks_table
# make migration-generate name=add_dueDate_field
# make migration-run
# make migration-revert
