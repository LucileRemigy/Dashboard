FROM node:14.15.5
WORKDIR /home/server/
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
