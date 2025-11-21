FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Create logs directory inside container
RUN mkdir -p /app/logs

EXPOSE 3000

CMD ["node", "server.js"]
