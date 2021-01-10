FROM node:14.15.4-alpine3.12

WORKDIR /home/node/app

COPY ./package.json /home/node/app

RUN mkdir /data && \
	npm install --silent --progress=false --production

COPY ./ /home/node/app

VOLUME ["/data"]

CMD ["npm", "start"]
