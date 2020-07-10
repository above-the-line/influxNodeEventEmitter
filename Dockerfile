# make sure the base Node/OS image matches the target runtime
# Below example uses "Raspbian GNU/Linux 10 (buster)" 

# Use the official image as a parent image.
FROM node:10-buster-slim

# Set the working directory in the container image. Specifying that all subsequent commands should be executed there.
WORKDIR /usr/src/app

# Copy the file from your host to your current location.
# COPY the file package.json from your host to the present location (.) in your image (so in this case, to /usr/src/app/package.json)
COPY package.json .

# Run the command inside your image filesystem.
RUN npm install

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 8080

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Run the specified command within the container.
CMD [ "npm", "start" ]



