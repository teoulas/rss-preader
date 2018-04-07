FROM node:9.11.1-alpine
WORKDIR /app
COPY . .
RUN yarn install
ENV PATH="/app/node_modules/.bin:${PATH}"
CMD ["npm", "run", "start"]
