
# Quickstart

Contains code related to core-review of DEVSOC.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in both the server and client directory.

Client side:

`REACT_APP_SERVER`(The server url)

`REACT_APP_CLIENT`

`REACT_APP_CLIENT_ID`

Server side:

`dbURI`

`CLIENT_ID`

`CLIENT_SECRET`

`salt`

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

To deploy this project run you have to have two independent url's, one for the client and one for the server.