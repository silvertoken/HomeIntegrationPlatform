const rabbitSettings = {
    cert: process.env.RABBIT_USER_CERT,
    ca: process.env.RABBIT_CA_CERT,
    key: process.env.RABBIT_USER_KEY,
    server: process.env.RABBIT_SERVER,
    port: process.env.RABBIT_PORT
};

const serverSettings = {
    port: process.env.PORT
};

module.exports = Object.assign({}, { rabbitSettings, serverSettings });