from typing import ByteString
from OpenSSL import crypto
import OpenSSL, os

""" pubFile = open('x:/rabbit/ssl/rabbit.localdomain.crt', 'rt').read()
priFile = open('x:/rabbit/ssl/rabbit.localdomain.pem', 'rt').read()
caFile = open('x:/ansible/ssl/ca/ca.localdomain.crt', 'rt').read()
c = OpenSSL.crypto
pubCert = c.load_certificate(c.FILETYPE_PEM, pubFile)
caCert = c.load_certificate(c.FILETYPE_PEM, caFile)
priCert = c.load_privatekey(c.FILETYPE_PEM, priFile)
print(pubCert.get_subject())
print(caCert.get_extension(2))
print(c.dump_certificate(c.FILETYPE_PEM, pubCert))
print(c.dump_privatekey(c.FILETYPE_PEM, priCert)) """

def generateCA(bits: int, cn: str , days: int, phrase: str):
    caKey = crypto.PKey()
    caKey.generate_key(crypto.TYPE_RSA, bits)
    caCert = crypto.X509()
    caCert.set_version(2)
    caCert.set_serial_number(int.from_bytes(os.urandom(20), 'big') >> 1)
    caCert.get_subject().CN = cn
    caCert.gmtime_adj_notBefore(0)
    caCert.gmtime_adj_notAfter(days * 24 * 60 * 60)
    caCert.set_issuer(caCert.get_subject())
    caCert.set_pubkey(caKey)
    caCert.add_extensions([
        crypto.X509Extension(b"basicConstraints", True, b"CA:TRUE, pathlen:0"),
        crypto.X509Extension(b"keyUsage", True, b"keyCertSign, cRLSign"),
        crypto.X509Extension(b"subjectKeyIdentifier", False, b"hash", subject=caCert)
    ])
    caCert.sign(caKey, "sha256")
    certificate = {
        'cert': crypto.dump_certificate(crypto.FILETYPE_PEM, caCert),
        'key': crypto.dump_privatekey(crypto.FILETYPE_PEM, caKey, passphrase=phrase)
    }
    return certificate


ca = generateCA(4096, "ca.localdomain", 1, b'test1234')
cert = crypto.load_certificate(crypto.FILETYPE_PEM, ca['cert'])
for i in cert.get_subject().get_components():
    print(i[0] + b' = ' + i[1])

