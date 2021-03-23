FROM node:14.15.5
WORKDIR /home/web/
COPY package.json ./
RUN npm install
COPY ./ ./
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENTRYPOINT ["npm", "run", "dev"]