
# Quickstart

Contains code related to core-review of DEVSOC.
There is a typescript branch for this repo which is still under development.
The project is deployed at [quickstart](https://bp-gc.in/quickstart)

**Note: In order to access the admin section credentials are required for which you have to contact me.**

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in both the server and client directory.

Client side:

`REACT_APP_SERVER`(The server url i.e in my case http://localhost:8000)

`REACT_APP_CLIENT`(The client url i.e in my case http://localhost:3000)

`REACT_APP_CLIENT_ID`

Server side:

`dbURI`

`CLIENT_ID`

`CLIENT_SECRET`

`oauth`

`admin`

`CLIENT`(The client url)

## Run Locally

Clone the project

```bash
  git clone https://github.com/ananth243/core-review.git
```

Go to the server directory

```bash
  cd server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

Same for the client directory
## Deployment

To deploy this project you have to have two independent url's, one for the client and one for the server.
