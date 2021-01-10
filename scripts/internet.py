import schedule, time, speedtest, datetime
from pymongo import MongoClient

def internetJob():
    s = speedtest.Speedtest()
    s.get_best_server()
    s.download()
    s.upload(pre_allocate=False)
    return s.results.dict()

def mongoInject(result:dict):
    c = MongoClient('mongodb://mongo.localdomain:27017',
                    authMechanism='MONGODB-X509',
                    ssl=True,
                    ssl_certfile='X:/ansible/ssl/certs/hip.mongo.localdomain.crt',
                    ssl_keyfile='X:/ansible/ssl/private/hip.mongo.localdomain.pem',
                    ssl_ca_certs='X:/ansible/ssl/ca/ca.localdomain.crt')
    result['createdAt'] = datetime.datetime.utcnow()
    c.hip.internetspeed.insert_one(result)

def job():
    mongoInject(internetJob())

schedule.every().hour.at(":00").do(job)

while True:
    schedule.run_pending()
    time.sleep(1)

