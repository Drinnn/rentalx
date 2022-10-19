import { DataSource } from 'typeorm';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  username: '',
  password: '',
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
