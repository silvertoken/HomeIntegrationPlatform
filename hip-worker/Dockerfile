FROM alpine:3.11

#removes spam
ENV PYTHONUNBUFFERED=1

#rabbitmq server
ENV RABBIT_HOST=hip-rabbit
ENV RABBIT_PORT=5671
ENV RABBIT_USER_CERT=/data/client.crt
ENV RABBIT_USER_KEY=/data/client.pem
ENV RABBIT_CA_CERT=/data/ca.crt

#monogo rest api
ENV MONGO_HOST=hip-mq
ENV MONGO_PORT=30000

RUN apk add --no-cache python3 && \
	if [ ! -e /usr/bin/python ]; then ln -sf python3 /usr/bin/python ; fi && \
	python3 -m ensurepip && \
	rm -r /usr/lib/python*/ensurepip && \
	pip3 install --no-cache --upgrade pip setuptools wheel && \
	if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
	pip3 install --no-cache --upgrade pika ssl && \
	apk add --no-cache ansible && \
	apk add --no-cache terraform && \
    mkdir -p /etc/ansible /ansible /hip-worker /data && \
    rm -rf /tmp/* && \
    rm -rf /var/cache/apk/*
	
COPY ansible.cfg hosts /etc/ansible/
COPY . /hip-worker/

VOLUME ["/ansible", "/data"]

WORKDIR /hip-worker
CMD [ "python", "worker.py" ]