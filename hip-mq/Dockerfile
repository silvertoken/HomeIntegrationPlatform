FROM node:14.2.0-alpine3.11

ENV PORT=30000
ENV RABBIT_SERVER=hip-rabbit
ENV RABBIT_PORT=5671
ENV RABBIT_USER_CERT=/data/client.crt
ENV RABBIT_USER_KEY=/data/client.pem
ENV RABBIT_CA_CERT=/data/ca.crt

WORKDIR /home/node/app

COPY ./package.json /home/node/app

RUN mkdir /data && \
	npm install --silent --progress=false --production

COPY ./ /home/node/app

VOLUME ["/data"]

CMD ["npm", "start"]
