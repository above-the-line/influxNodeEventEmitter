# nodeEventEmitter - Post to InfluxDB

This is a simple service that simulates sampling telemetry data from an IOT device
and posting it to an InfluxDB instance.

#### STEPS TO SETUP

1. Create a database in InfluxDB that this service will send messages to
2. Create user/password in InfluxDB that this service will use to authenticate
3. Run service

#### STEPS FOR REMOTE DEPLOYMENT WITH DOCKER HUB

1. Login to Docker Hub and create a repo

`<my-account-name>/<repo-name>`

2. Create the container image and tag with your Docker Hub username

`docker build --tag <my-account-name>/<repo-name>:1.0`

3. Upload the container image to Docker Hub

`docker push <my-account-name>/<repo-name>:1.0`

4. Login to Docker on the IOT device

`docker login`

5. Pull the Docker image

`docker pull <my-account-name>/<repo-name>:1.0`

6. Run the Docker image as a container.

`docker run abovetheline/azuremessenger:1.0 --name messenger`

#### STEPS FOR DEPLOYMENT TO DEVICE ON LOCAL NETWORK

1. Re-direct commands to the remote environment (the device).

`export DOCKER_HOST="ssh://my-user@remote-host"`

2. Run a container. To prove that we are on remote-host, this will print its hostname.

`docker run --rm --net host busybox hostname -f`

3. Run docker commands here will be run on remote-host.

4. Switch back to your local environment.

`unset DOCKER_HOST`
