import pika
import ssl
from pika.credentials import ExternalCredentials

class HipWorker:
    """HIP Worker Class"""

    def __init__(self, rabbitServer: str, rabbitPort: int, caFile: str, clientCert: str, clientKey: str):
        self.__context = ssl.create_default_context(cafile=caFile)
        self.__context.load_cert_chain(clientCert, clientKey)
        self.__context.check_hostname = False
        self.__ssl_options = pika.SSLOptions(self.__context, rabbitServer)
        self.__conn_params = pika.ConnectionParameters(host=rabbitServer, port=rabbitPort, ssl_options=self.__ssl_options, credentials=ExternalCredentials())

    """Connect to rabbit and open a channel"""
    def connect(self):
        self.__connection = pika.BlockingConnection(self.__conn_params)
        self.__channel = self.__connection.channel()

    """Declare and setup queue"""
    def connectQueue(self, queue: str, callback):
        self.__channel.queue_declare(queue=queue)
        self.__channel.basic_consume(queue=queue, on_message_callback=callback)

    def startWorker(self):
        self.__channel.start_consuming()