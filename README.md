# Caring Jr. Engineer Challenge

Reports are located [here](https://github.com/ommwong/caring-challenge-front-end)

## Tools used
* HTTP server
* gRPC microservice
* Postgres
* Knex
* React

## Areas to polish

* I'm having some issues checking for duplications before inserting new rows; post methods currently allow for duplicate data

* I implemented pagination on the front-end; I don't think this is great for performance if the dataset is large

* I didn't use any streaming methods, but I see value in implementing them to reduce requests to the backend

* I used the dynamic approach to protocol buffers. It was easier to learn in a crunch, but I believe the static approach might be better for type safety and is required for other languages.