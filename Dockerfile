FROM node:16.15.1
RUN mkdir -p /usr/src/store
COPY dist /usr/src/store/dist
COPY authMiddleware.js /usr/src/store/
COPY data.json /usr/src/store/
COPY server.js /usr/src/store/server.js
COPY deploy-package.json /usr/src/store/package.json
WORKDIR /usr/src/store
RUN npm install
EXPOSE 81
CMD ["node", "server.js"]