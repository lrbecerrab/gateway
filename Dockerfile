# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.18.0
ARG METERADDRESS
ARG NETWORK

FROM node:${NODE_VERSION}-alpine

# Use production node environment by default.
ENV NODE_ENV production

# Create app directory
WORKDIR /usr/src/app


COPY package*.json ./


# Install app dependencies
RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Run the application.
RUN node src/server.js simulated -a=${METERADDRESS} ${NETWORK} -r -c
CMD node src/server.js simulated -a=${METERADDRESS} ${NETWORK} -r -c