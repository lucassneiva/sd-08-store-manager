module.exports = {
  api: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    username: '',
    password: '',
    pathname: '',
  },
  mysqlConnection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'fill it up',
  },
  mongodbConnection: {
    protocol: 'mongodb',
    hostname: 'localhost',
    port: '27017',
    username: '',
    password: '',
    database: 'StoreManager',
    search: 'retryWrites=true&w=majority',
  },
};
