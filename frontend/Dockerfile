### STAGE 1: Build ###

FROM node:latest AS build

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build package
RUN npm run build

### STAGE 2: Run ###
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/ /app/html

EXPOSE 80
