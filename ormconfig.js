module.exports = {
  "type": "mysql",
  "host": process.env.DATABASE_URL || "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "educationdev",
  "synchronize": true,
  "logging": false,
  "entities": ["src/**/entities/*.ts"]
}