FROM node:14-alpine
WORKDIR /usr
COPY package.json ./
COPY src ./src
RUN npm install
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","src/index.js"]
