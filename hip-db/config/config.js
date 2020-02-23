const dbSettings = {
    db: process.env.DB,
    cert: process.env.DB_USER_CERT,
    ca: process.env.DB_CA_CERT,
    key: process.env.DB_USER_KEY,
    server: process.env.DB_SERVER
};

const serverSettings = {
    port: process.env.PORT
};

module.exports = Object.assign({}, { dbSettings, serverSettings });