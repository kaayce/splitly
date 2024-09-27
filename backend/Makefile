DOCKER_COMPOSE_DEV=docker-compose -p splitly-dev -f ./docker-compose.yml

db-start:
	$(DOCKER_COMPOSE_DEV) up -d # start containers

db-stop:
	$(DOCKER_COMPOSE_DEV) down # stop containers

db-setup:
	pnpm generate:schema # generate schema
	pnpm db:migrate # run migrations
	pnpm db:seed # seed data

init:
	docker volume create splitly-pgdata # create volume
	pnpm i

start:
	$(MAKE) db-start || true # start containers
	db-setup
	pnpm dev

sql:
	docker exec -it splitly-db psql postgres://splitly:splitly@localhost:5432/splitly # connect to database