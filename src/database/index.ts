import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'rentalx',
  password: 'rentalx',
  database: 'rentalx',
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
