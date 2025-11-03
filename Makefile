
.PHONY: create_network start_all migrate
all: create_network start_all

NETWORK_NAME := test_hh_net_126373989

create_network:
	@docker network inspect $(NETWORK_NAME) > /dev/null 2>&1 || (echo "Создаю сеть $(NETWORK_NAME)" && docker network create $(NETWORK_NAME))

start_all:
	@echo "Запуск всех микросервисов..."
	@docker compose -f microservices/db/docker-compose.yml down
	@docker compose -f microservices/redis/docker-compose.yml down
	@docker compose -f microservices/bun/docker-compose.yml down


start:create_network start_all



stop_all:
	@echo "Остановка всех микросервисов..."
	@docker compose -f microservices/db/docker-compose.yml down
	@docker compose -f microservices/redis/docker-compose.yml down
	@docker compose -f microservices/bun/docker-compose.yml down
down:stop_all
stop:stop_all



