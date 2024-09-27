DOCKER_COMPOSE_DEV=docker-compose -p splitly-dev -f ./docker-compose.yml

db-start:
	$(DOCKER_COMPOSE_DEV) up -d

db-stop:
	$(DOCKER_COMPOSE_DEV) down

db-setup:
	pnpm generate:schema
	pnpm db:migrate
	pnpm db:seed

db-stop:
	$(DOCKER_COMPOSE_DEV) down

init:
	docker volume create splitly-pgdata
	pnpm i

start:
	$(MAKE) db-start || true
	db-setup
	pnpm dev

sql:
	docker exec -it splitly-db psql postgres://splitly:splitly@localhost:5432/splitly