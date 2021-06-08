export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3001,
  db: {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'database-drivers',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    username: process.env.DATABASE_USER || 'project',
    password: process.env.DATABASE_PASSWORD || 'project',
    database: process.env.DATABASE_DB || 'database',
    synchronize: false,
    autoLoadEntities: true
  }
});
