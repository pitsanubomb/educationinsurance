FROM node:8.11-alpine

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

EXPOSE 8080
CMD ["npm","start"]

COPY . .

HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:8080 || exit 1