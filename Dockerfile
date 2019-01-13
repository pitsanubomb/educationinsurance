FROM node:11.6-alpine

WORKDIR /usr/app
COPY package.json .
RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g nodemon cross-env eslint npm-run-all node-gyp node-pre-gyp && npm install\
	&& npm rebuild bcrypt --build-from-source

EXPOSE 8080
CMD [ "npm", "start" ]

COPY . .