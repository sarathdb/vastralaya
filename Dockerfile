
#Use official Node.js Alpine image as base image
FROM node:23-alpine3.19

#Set the working directory in the container
WORKDIR /app

#Copy the package-json file to the working directory
COPY package*.json ./

#Install all dependencies

RUN yarn install

#Copy the content of local src directory to the working directory.

COPY . .

# Expose the port the app runs in

# Start the app in development mode.

CMD [ "npm" "start"]
