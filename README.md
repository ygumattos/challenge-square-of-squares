# Challenge: Square of Squares
**Version:** `2.0`

## Goals:

### API:

- [x] To add a territory
- [x] To return the list of all territories
- [x] To remove a territory
- [x] Get data from a single territory
- [x] Get status of a square
- [x] Throw paint on it!
- [x] List all painted squares of a territory
#### Dashboard:
- [x] List of territories ordered by most painted area
- [x] List of territories ordered by most proportional painted area
- [ ] List of last 5 painted squares
- [ ] List of last 5 errors
- [ ] Painted area / total area (from all territories' areas)


### Infrastructure

- [x] 1.0: Docker, for real
- [x] 2.0: Lets secure it a bit
- [ ] 3.0 Update: Load balance that server sir!

## How to use

1. Clone the project
2. Open a terminal and navigate to the project
3. If you have docker and docker-compose install in your machine use:
```
make up
```
### Another way:
You can init a mongodb container and start the project with:
```
yarn dev
or
npm run dev
```
> Don't forget to use .env.example

---------------------
## LoadBalance

### NGINX Config

```
server {
    listen       80;
    server_name  api.vitta;

    location / {
        proxy_set_header   X-Forwarded-For $remote_addr;
        proxy_set_header   Host $http_host;
        proxy_pass         http://0.0.0.0:8888;
    }
```

```
0.0.0.0 api.vitta
```
-----------------------------
**If all is ok, you can use requests below**

## CURLS

### Territories

```
curl --request GET \
  --url 'http://api.vitta/territories/1?withpainted=true'
```

```
curl --request GET \
  --url http://api.vitta/territories
```

```
curl --request DELETE \
  --url http://api.vitta/territories/20
```

```
curl --request POST \
  --url http://api.vitta/territories \
  --header 'Content-Type: application/json' \
  --data '{
	"name": "A",
	"start": {
		"x": 0,
		"y": 0
	},
	"end": {
		"x": 70,
		"y": 70
	}
}'
```
### Squares

```
curl --request GET \
  --url http://api.vitta/squares/1/2
```
```
curl --request PATCH \
  --url http://api.vitta/squares/66/66/paint
```
### Dashboard
```
curl --request GET \
  --url http://api.vitta/dashboard
```
