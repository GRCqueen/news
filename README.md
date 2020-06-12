# News of Everything

API : - [newsapi.org][3]
      - [Dekontaminasi][2]
      - [chroniclingamerica.loc.gov][4]

## API Documentation

NOE API is organized around [REST][1]. It is based on resource-oriented URLs and returns responses as JSON. In NOE, all users is saved as instances of model User.

[1]: https://en.wikipedia.org/wiki/Representational_state_transfer
[2]: https://dekontaminasi.com/api/id/covid19/news
[3]: https://newsapi.org/
[4]: https://chroniclingamerica.loc.gov/search/titles/results/?terms=ohio&format=json

## Authentication /register & /login

### POST /register

This will create a new user based on form-URL-encoded request body.

Request header:
```javascript
{ Content-Type: "application/json" }
```

Request body:
```javascript
{
  "email": "mail@mail.ru",
  "password": "bukanpassword"
}
```

Success Response: Status Code 201
```javascript
{
  "User": {
    "id": 8,
    "email": "mail@mail.ru"
  }
}
```

Error Response: Status Code 500
```javascript
{
  "msg": "Error in signup",
  "error": "Email have been registered"
}
```

### POST /login

This will return a string of jsonwebtoken based on input of user (email and password) in request body.

Request body:
```javascript
{
  "email": "mail@mail.ru",
  "password": "bukanpassword"
}
```

Success Response: Status Code 200
```javascript
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJhZGFkZWhhamFAbWFpbC5ydSIsImlhdCI6MTU4ODA0ODg0MH0.xwCKLdoiniQYBSqRQDBt50gAlfEB0blhXqDmHNoWWL0"
}
```

Error Response: Status Code 201
```javascript
{ "msg": "Wrong email or password" }
```

## 3rd Party APIs /api

### GET /api/news/:query

This will get an array of 10 news based on "query" request params.

Request header:
```javascript
{
  Content-Type: "application/json",
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZGFkZWhhamFAbWFpbC5ydSIsImlhdCI6MTU5MTY5MzIxM30.8SE2lVhUU447a8H5Gex0SW7h1uOIeC9cotQs5k09myI"
}
```

Success Response: Status Code 200
```javascript
{
  "results": [
    {
      "source": {
        "id": null,
        "name": "Lifehacker.com"
      },
      "author": "Beth Skwarecki on Vitals, shared by Beth Skwarecki to Lifehacker",
      "title": "How to Read a COVID-19 Graph",
      "description": "When you see a flat line on a graph, it’s tempting to think, “Oh hey, at least the situation isn’t getting any worse!” But one of the common types of charts we see for COVID-19 is of new cases per day. In that case, a flat line means that things are, in fact,…",
      "url": "https://vitals.lifehacker.com/how-to-read-a-covid-19-graph-1843587114",
      "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/qir0yuubsn1gbg5xsbar.png",
      "publishedAt": "2020-05-21T16:30:00Z",
      "content": "When you see a flat line on a graph, its tempting to think, Oh hey, at least the situation isnt getting any worse! But one of the common types of charts we see for COVID-19 is of new cases per day. I… [+2532 chars]"
    }
  ]
}
    
```

Error Response: Status Code 500
```javascript
{
  "msg": "Internal server error"
}
```
