import sys
import os
from hipWorker.hipWorker import HipWorker


def workerCallback( ch, method, properties, body):
        print("Task: %r" % body)

def main():
    worker = HipWorker(os.environ["RABBIT_HOST"], os.environ["RABBIT_PORT"], os.environ["RABBIT_CA_CERT"], os.environ["RABBIT_USER_CERT"], os.environ["RABBIT_USER_KEY"])
    worker.connect()
    worker.connectQueue('Tasks', workerCallback)
    worker.startWorker()

if __name__ == '__main__':
    main()