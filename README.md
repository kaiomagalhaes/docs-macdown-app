# React project starter

- [Intro](#intro)
- [Running the project](#running-the-project)
  - [Requirements](#requirements)
  - [Getting started](#getting-started)
- [Scripts](#scripts)
  - [Shell Scripts](#shell-scripts)
  - [NPM Scripts](#npm-scripts)
- [Development best practices](#development-best-practices)
- [Continuous Integration](#continuous-integration)
  - [Introduction](#introduction)
  - [Configuration](#configuration)
- [Continuous Deployment](#continuous-deployment)
  - [Introduction](#cd-introduction)
  - [Docker Single Container](#docker-single-container)
    - [Release Job](#release-job)
    - [Settings for the container](#settings-for-the-container)

## 👋 Intro

This is React project starter. Its goal is to offer a simple way to start a new front-end application. It offers:

- Components
- Pages
- Models
- GraphQL 
- Environment specific configurations
- Docker development environment
- Tests

## Running the project

### Requirements

We recommend running this project using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/).  
But if you want to run it by yourself you'll need to have [Node.js](https://nodejs.org/en/download/) installed.

This project uses Codelitt's private NPM packages. Make sure to go through our [Authentication](./AUTHENTICATION.md) 
section before moving forward.

### Getting started
1. Clone the project.
2. Copy the `.env.example` file into an `.env` file with your ENV variables.
3. Run the docker container with `sh bin/docker/start.sh`.
4. Go to your browser and access `http://localhost:3000`.

## Scripts

### Shell Scripts
Inside the `bin` folder you'll find a set of helpful scripts that you can use to speedup the development setup.

- `bin/docker/dev.sh`: Runs the Docker Compose container and creates a bash session.
- `bin/docker/start.sh`: Runs the Docker Compose container and after starts the app.

You can run any shell script with: 
```shell
sh <script>
```

### NPM Scripts

The project comes with multiple `package.json` scripts created to run useful commands.

- `start`: Runs the app in the development mode.
- `build`: Builds the app for production to the `build` folder ([More info](https://facebook.github.io/create-react-app/docs/deployment)).
- `docker:dev`: Starts the Docker Container and creates a bash session.
- `docker:dev:build`: Builds the Docker Container.
- `docker:dev:start`: Starts the Docker Container and runs the app, so you can immediately access the app on http://localhost:300.
- `docker:dev:stop`: Stops the Docker container.
- `docker:prod:build`: Builds the app for production.
- `docker:prod:start`: Builds the app for production and starts the ngnix server on port 80.
- `docker:prod:stop`: Stops the prod build container.
- `lint`: Runs the eslint tool
- `lint:fix`: Runs the eslint tool and fix possible offenses.
- `prettier:format`: Properly formats all our code.
- `test`: Runs all tests
- `test:watch`: Launches the test runner in the interactive watch mode.

You can run any NPM script with: 
```shell
npm <script>
```

## Development best practices
When developing a new feature for this project make sure to go through the checklist below:

- [x] Aways use `@codelitt/ay-css-library` SCSS variables in colors and fonts.
- [x] Aways use the components from the `@codelitt/ay-design-library` package. if you need a new component it should be added there.
- [x] Create tests for every new feature.
- [x] Make sure to run the lint tool and have enabled git pre-commit hooks.

## Continuous Integration

For continuous integration we have opted to use Azure Pipelines,
the reason for it is that we are going to use all azure services and the integration is very smooth.

### Introduction

**Azure Pipelines** is a integration provided directly into Github that creates a CI/CD environment for Builds/Releases in each case.
It provides a easy and friendly UI to crete builds, track their progress, issues and understand what is being released.
After installing Azure Pipelines on the repository we are going to be redirected to a **Azure DevOps portal**, this will be where we are going to manage everything for that user.

### Configuration

Even though configurations can be done using the UI provided by **Azure DevOps**, we opt to use yml files like `test-pipeline.yml` or `build-pipeline.yml`.
The reasoning is to track the configuration and easily migrate to any other repository or project.
Also we can provide different configurations for different providers and the base project will be capable of be deployed to any of the available providers.

#### Create build in Azure DevOps.

When creating a new build, we can import settings from a **yml** file, use the `test-pipeline.yml` as the config file and will import use those tasks to provide the build steps.

#### Test configuration

For the test steps we have provided a basic node js testing flow.
The app project will be build using nodejs (currently docker test are not supported) and validate that the build is working as expected.
Then will validate tests and lint.
In the case of environment variables, for security reasons, it should be stored on the **Azure DevOps portal** to avoid having those variables in plain text on the repository.

#### Build release configuration
The app project will be built based on the `docker-compose.yml` file. Azure will look up image that need to be built, will build those images and push it to the **Azure Container Registry** or other container repository, where the images tags are stored. 
To configure that you have to update the `azureContainerRegistry` property, with the registry that you want to use. 
Using the Azure UI is easy to configure the azure container registry, if not properties are configurable using application settings.

`DOCKER_REGISTRY_SERVER_URL`: Registry URL
`DOCKER_CUSTOM_IMAGE_NAME` : Complete image name
`DOCKER_REGISTRY_SERVER_USERNAME` & `DOCKER_REGISTRY_SERVER_PASSWORD` : For repository access.

#### Container registry
For the porpouse of reviewing full azure integration we have setted up a **Azure Container Registry**. For that we have created the corresponding resource on azure, and once created we have to do some small configurations:

- Enable Admin access, from the Security Tab.
- Copy one of the two password provided, you will need that for future access.
- When configuring access to this registry from Azure Pipelines, the microsoft wizard will be pretty straight forward, just selecting the repository and the image, from the suscription you have on azure, will be enough to set up the connection.
- If you want to follow the **AppSettings** approach, check the section above for the properties to set up.

## Continuous Deployment

### <a name="cd-introduction"></a> Introduction

The deployed app is a NodeJS application, this solution can be deployed in different ways using docker containers or even as basic webapp running node.
For now we have configured single docker container.

### Docker Single Container

The docker single container configuration uses the image configured with the specific tag, applications settings and run it. 
Is important that the image exposes port 8080 or 80, so this is mapped from the image. This is a limitation of azure.

#### Release Job

The release job is automatically triggered after a deployment build completes, and executes the first stage as part of the Continuous deployment process. Normally this will deploy to the DEV environment, and force for authorization on the following environments.

The job consists on a set of **steps** for each **stage**.
For now we are only using one step for this release, but database specific jobs like migrations can be run as part of the release process.

The step we are using is `Deploy Azure App Service`, that request access to the specific `Web App` that we created for this container. Also it will request the TAG version of the image that was just built.

For dev porpuses latest could be an option but its recommended to use the `$(Build.BuildId)` variable that will match the image built on the build job that triggered the release. This way each release is attached to a specific image and can be redeployed at any time.

As its explained later, application settings can be defined and stored as variables of the release and used on the `App & Configuration settings` to provide environment variables of the container.

#### Settings for the container

Environment variables can be configured over the application using the `Configuration` that will pass over as environment variables.
Also this settings can be provided on the Container deployment task using the `App Settings` that are provided on the `Deploy Azure App Service` step. This will create or update the current configuration of the container.
