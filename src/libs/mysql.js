import mysql from 'serverless-mysql';

export const dbConnect = mysql({
  config: {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'nextmysqlcrudimg',
  },
});
