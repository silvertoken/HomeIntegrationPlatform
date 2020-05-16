FROM node:14.2.0-alpine3.11

ENV PORT=30000
ENV DB=hip
ENV DB_SERVER=localhost:27017
ENV DB_USER_CERT=/data/client.crt
ENV DB_USER_KEY=/data/client.pem
ENV DB_CA_CERT=/data/ca.crt

WORKDIR /home/node/app

COPY ./package.json /home/node/app

RUN mkdir /data && \
	npm install --silent --progress=false --production

COPY ./ /home/node/app

VOLUME ["/data"]

CMD ["npm", "start"]

