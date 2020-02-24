FROM node:13.8.0-alpine3.11

ENV PORT=30000
ENV DB=hip
ENV DB_SERVER=localhost:27017
ENV DB_USER_CERT=/data/client.crt
ENV DB_USER_KEY=/data/client.pem
ENV DB_CA_CERT=/data/ca.crt

WORKDIR /home/node/app

COPY hip-db/package.json /home/node/app

RUN mkdir /data && \
	npm install --silent --progress=false --production

COPY hip-db/ /home/node/app

VOLUME ["/data"]

EXPOSE PORT

CMD ["npm", "start"]

