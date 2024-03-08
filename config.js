require('dotenv/config');

config = {
    "API_URL": process.env.API_URL || "/api/v1",
    "APP_PORT": process.env.API_PORT || 3000,
    "MONGO_DB_URL": process.env.MONGO_DB_URL,
    "JWT_SECRET": process.env.JWT_SECRET
}

module.exports = config;
