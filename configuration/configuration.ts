export const configuration = () => ({
  port: parseInt(process.env.SERVER_PORT, 10) || 3000,
  production: process.env.PRODUCTION,
  database: {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    db: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT,
    host: process.env.POSTGRES_HOST,
  },
  auth: {
    saltLength: 7,
  },
  maxFileSize: 5000 * 1000,
  email: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
