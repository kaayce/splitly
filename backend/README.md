# Splitly BE

## Launching the Server

To launch this project, you need to install:

* [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/install/), to launch the Postgres database
* Node 20 (you can install it through [nvm](https://github.com/nvm-sh/nvm))

Once these dependencies are installed, you can set up and launch the projects:

```sh
# install dependencies, load the database fixtures
make init

# launch the project
make start
```