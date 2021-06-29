## build environment

# pull official base image
FROM node:13.12.0-alpine as deps
# set working directory
WORKDIR /app
# add '/app/node_modules/.bin' to PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json package-lock.json ./a
RUN npm ci --silent
# add app
COPY . ./
# start app
CMD ["npm", "start"]

## production environment

# FROM nginx:stable-alpine
# COPY --from=deps /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]   