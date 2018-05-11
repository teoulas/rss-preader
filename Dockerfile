FROM node:10.1.0-alpine
WORKDIR /app
COPY . .
ENV PATH="/app/node_modules/.bin:${PATH}"
CMD ["yarn", "start"]
