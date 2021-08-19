FROM node:latest

COPY dist/ /src/dist/
COPY public/ /src/public/
COPY package.json /src
COPY indext.html /src

WORKDIR /src

RUN npm install --production

EXPOSE 9000 

CMD npm start