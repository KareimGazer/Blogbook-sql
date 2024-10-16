require('dotenv').config();

const PORT = process.env.PORT || 3000
const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
    PORT,
    DATABASE_URL
}
