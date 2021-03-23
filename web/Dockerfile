FROM node:14.15.5
WORKDIR /home/web/
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]