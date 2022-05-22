# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# IMPORTANT

This React App is made to work with my Coding Challenge API only.
It will not have any functionality otherwise, merely working as a preview.

The Coding Challenge backend service is currently in a private repository,
I can not provide any unauthorized access at the moment.

## Installation

In the project directory, you can run this command from the terminal:

### `npm install` to install dependencies, then:
### `npm start`

Runs the app in the development mode.\
Open [http://localhost:9775](http://localhost:9775) to view it in the browser.

## Docker

Alternatively, if you have Docker installed on your system, you can download this docker image of the same app: 

`docker pull yenis92/codingchallenge-dimamovic-frontend:latest`

Then you can run it as a container from Docker Desktop by specifying PORT 9775, 
 
OR with this command from the terminal:

`docker run -p 9775:9775 yenis92/codingchallenge-dimamovic-frontend`

## API

The service I built for the coding challenge provides a REST API which can be used to interact with it.

The API has the following contract:

### GET /status

Indicate the service has started up correctly and is ready to accept requests.

Responses:
- **200 OK** When the service is ready to receive requests.

### PUT /teams

Load the list of available teams in the service and remove all previous data (existing teams and projects).
This method may be called more than once during the life cycle of the service.

**Body** _required_ The list of teams to load.

**Content Type** `application/json`

Sample:

```json
[
  {
    "id": 1,
    "developers": 5
  },
  {
    "id": 2,
    "developers": 4
  }
]
```

Responses:
- **200 OK** When the list is registered correctly
- **400 Bad Request** When there is a failure in the request.

### POST /project

A project needs to be assigned to a team.

**Body** _required_ The project, that needs to be assigned to a team.

**Content Type** `application/json`

Sample:

```json
{
  "id": 1,
  "devs_needed": 3
}
```

Responses:

- **200 OK** When the project is assigned correctly.
- **400 Bad Request** When there is a failure in the request format.

### POST /completed

A project has been completed. Whether it has been started or not.

**Body** _required_ A form with the project ID, such that `ID=X`

**Content Type** `application/x-www-form-urlencoded`

- **200 OK** When the project is assigned correctly.
- **404 Not found** When the project was not found.
- **400 Bad Request** When there is a failure in the request format.

### POST /assigned

Given a project ID 'ID=x', return the team the project is assigned to, or no team if the project is waiting to be assigned.

**Body** _required_ A form with the project ID, such that `ID=X`

**Content Type** `application/x-www-form-urlencoded`

- **200 OK** With the team as payload when the project is assigned to a team.
- **204 No Content** When the project is waiting for an assignment.
- **404 Not found** When the project was not found.
- **400 Bad Request** When there is a failure in the request format.
- 
![Untitled](https://user-images.githubusercontent.com/22280179/169706708-d0af7f69-30a0-48c5-8745-3d74630b32b4.png)

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
